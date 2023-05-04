import React, { useContext } from "react";
import { NotesContext } from "../../context/NotesContext";

const DownloadNoteButton = () => {
  const { activeNote } = useContext(NotesContext);

  const handleSave = () => {
    const note = JSON.stringify(activeNote.text);
    const element = document.createElement("a");
    const file = new Blob([note], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = activeNote.title + ".txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <button className="download-note-button" onClick={handleSave}>
      Download this note
    </button>
  );
};

export default DownloadNoteButton;
