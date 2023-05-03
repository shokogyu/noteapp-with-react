import React from 'react'
import './Main.css'
import ReactMarkdown from 'react-markdown'


const Main = ({activeNote, onUpdateNote}) => {

  const onEditNote = (key, value) => {
    onUpdateNote({
      // id: activeNote.id,
      ...activeNote,
      [key]: value, // 動的キー
      modDate: Date.now()
    })
  }

  if(!activeNote) {
    return <div className='no-active-note'>選択されたノートがありません</div>
  }
  return (
    <div className='app-main'>
      <div className="app-main-note-edit">
        <input
          type="text"
          value={activeNote.title}
          onChange={(e) => onEditNote('title', e.target.value)}
        />
        <textarea
          id=""
          placeholder='ノート内容を記入'
          onChange={(e) => onEditNote('content', e.target.value)}
        >
          {activeNote.content}
        </textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Main