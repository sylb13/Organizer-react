import React, { useContext, useEffect } from "react";
import { NotesContext } from "../../context/NotesContext";
import NoteButton from "./NoteButton";

export default function MyNotesWindow() {
  const { getNotes, addEmptyNote, notes, setActiveNote, activeNote } =
    useContext(NotesContext);

  useEffect(() => {
    getNotes();
  }, []);

  const handleClick = () => {
    addEmptyNote();
  };

  const handleNoteClick = (id) => {
    setActiveNote(id);
    console.log(activeNote);
  };
  const notesList = notes.map((element) => {
    return (
      <li key={element.id}>
        <NoteButton
          id={element.id}
          clickFunction={() => handleNoteClick(element.id)}
          value={element.title}
        />
      </li>
    );
  });

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        maxHeight: "80%",
        maxWidth: "80%",
        backgroundColor: "#5970AA",
        borderRadius: "10px",
        overflowY: "scroll",
      }}
    >
      <div
        height={600}
        width={"100%"}
        itemsize={46}
        itemcount={5}
        overscancount={5}
      >
        <ul>{notesList}</ul>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="add-new-note-button" onClick={handleClick}></button>
      </div>
    </div>
  );
}
