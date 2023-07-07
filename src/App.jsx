import { useState } from 'react'
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import uuid from 'react-uuid'
import { useEffect } from 'react'

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])
  const [activeNote, setActiveNote] = useState(false)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    if(notes.length > 0) {
      setActiveNote(notes[0].id)
    }
  }, [])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: 'New Note',
      content: 'New Content',
      modDate: Date.now()
    }
    setNotes([...notes, newNote])
    console.log('onAddNote');
  }

  const onDeleteNote = (clickedNoteId) => {
    const clickedNoteTitle = notes.find(note => note.id === clickedNoteId).title;
    if(window.confirm(`「${clickedNoteTitle}」のノートを本当に削除しますか？`)) {
      const filterNotes = notes.filter((note) => note.id !== clickedNoteId)
      setNotes(filterNotes)
      console.log('onDeleteNote');
    }
  }

  const getActiveNote = () => {
    console.log('getacive');
    return notes.find((note) => note.id === activeNote)
  }

  const onUpdateNote = (updatedNote) => {
    // 修正された新しいノートの配列を返す
    const updatedNoteArray = notes.map((note) => {
      if(note.id === updatedNote.id) {
        return updatedNote
      } else {
        return note
      }
    })

    setNotes(updatedNoteArray)
  }

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      {/* getActiveNote()とカッコをつけることで読み込まれたタイミングで実行される */}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App
