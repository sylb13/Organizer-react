import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/NotesContext";

export default function NotesEditor() {
  const { activeNote, setNoteTitle, setNoteContent } = useContext(NotesContext);
  const [activeNotesTitle, setActiveNotesTitle] = useState();
  const [activeNotesContent, setActiveNotesContent] = useState();

  useEffect(() => {
    setActiveNotesTitle(activeNote.title);
    setActiveNotesContent(activeNote.text == null ? "" : activeNote.text);
  }, [activeNote.id]);

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
    setActiveNotesTitle(event.target.value);
  };
  const handleTextChange = (event) => {
    setNoteContent(event.target.value);
    setActiveNotesContent(event.target.value);
  };

  return (
    <div className="notes-editor">
      <h4 className="note-editor-h4">Title</h4>
      <div className="notes-title-editor">
        <input
          className="note-input"
          onChange={handleTitleChange}
          value={activeNotesTitle}
        ></input>
      </div>
      <h4 className="note-editor-h4">Note</h4>
      <div className="notes-text-editor">
        <textarea
          className="note-textarea"
          onChange={handleTextChange}
          value={activeNotesContent}
        ></textarea>
      </div>
    </div>
  );
}
