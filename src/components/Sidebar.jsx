import React from 'react'
import './Sidebar.css'

const Sidebar = ({ onAddNote, notes, onDeleteNote, activeNote, setActiveNote }) => {

  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate)

  return (
    <div className='app-sidebar'>
      <div className="app-sidebar-header">
        <h1 className="app-sidebar-heading">ノート</h1>
        <button onClick={onAddNote} className='app-sidebar-add-btn'>追加</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          <div 
            className={`app-sidebar-note ${note.id === activeNote && 'isActive' }`}
            key={note.id}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              {/* 画面読み込み時に発火しないようにアロー関数で記述する */}
              <button onClick={() => onDeleteNote(note.id)}>delete</button> 
            </div>
            <p>{note.content}</p>
            <small>{new Date(note.modDate).toLocaleDateString('ja-JP', {
              hour: '2-digit',
              minute: '2-digit',
            }) }</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar