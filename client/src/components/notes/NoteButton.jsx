import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../context/NotesContext";

export default function NoteButton(props) {
  const { activeNote } = useContext(NotesContext);
  const [buttonTitle, setButtonTitle] = useState(props.value);

  useEffect(() => {
    if (activeNote.id === props.id) {
      setButtonTitle(activeNote.title);
    }
  }, [activeNote.title]);
  return (
    <button
      className="note-button"
      onClick={() => {
        props.clickFunction(props.id);
      }}
      value={props.value}
      style={
        activeNote.id === props.id
          ? {
              backgroundColor: "#3c5186",
              borderWidth: "2px",
              borderStyle: "outset",
              borderColor: "black",
              borderImage: "initial",
              borderRadius: "10px",
            }
          : { backgroundColor: "#5970AA" }
      }
    >
      {buttonTitle}
    </button>
  );
}
