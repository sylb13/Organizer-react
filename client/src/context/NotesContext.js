import React, { useReducer } from "react";
import axios from "axios";
import { createContext } from "react";

const initialState = {
  notes: [],
  activeNote: { id: 0 },
};

const NotesReducer = (state, action) => {
  switch (action.type) {
    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "SET_ACTIVE_NOTE":
      return {
        ...state,
        activeNote: action.payload,
      };
    default:
      return { ...state };
  }
};

const NotesContext = createContext(initialState);

const NotesProvider = (props) => {
  const [state, dispatch] = useReducer(NotesReducer, initialState);

  const getNotes = () => {
    axios.get("http://localhost:3000/get-notes").then((res) => {
      console.log(res.data);

      dispatch({
        type: "GET_NOTES",
        payload: res.data,
      });
    });
  };

  const addEmptyNote = () => {
    axios
      .post("http://localhost:3000/add-empty-note")
      .then((res) => {
        console.log(res.data);
      })
      .finally(() => getNotes());
  };

  const setActiveNote = (id) => {
    if (id === null) {
      dispatch({
        type: "SET_ACTIVE_NOTE",
        payload: { id: 0 },
      });
    } else {
      const noteId = id;
      console.log(noteId);
      axios
        .post("http://localhost:3000/get-active-note", {
          id: noteId,
        })
        .then((res) => {
          console.log(res.data[0]);
          dispatch({
            type: "SET_ACTIVE_NOTE",
            payload: res.data[0],
          });
        });
    }
  };

  const setNoteTitle = (content) => {
    axios
      .post("http://localhost:3000/set-note-title-change", {
        title: content,
        id: state.activeNote.id,
      })
      .then((res) => {
        console.log("Tytuł notatki zaktualizowany");
      });
  };

  const setNoteContent = (content) => {
    axios
      .post("http://localhost:3000/set-note-content-change", {
        text: content,
        id: state.activeNote.id,
      })
      .then((res) => {
        console.log("Zawartość notatki zaktualizowany");
      });
  };

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        activeNote: state.activeNote,
        getNotes,
        addEmptyNote,
        setActiveNote,
        setNoteTitle,
        setNoteContent,
      }}
      {...props}
    />
  );
};
export { NotesContext, NotesProvider };
