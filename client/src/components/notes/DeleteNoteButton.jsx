import React, { useContext } from "react";
import { NotesContext } from "../../context/NotesContext";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function DeleteNoteButton() {
  const { activeNote, deleteNote } = useContext(NotesContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#C6B4CE",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const handleDelete = () => {
    deleteNote(activeNote.id);
    setOpen(false);
  };

  return activeNote.id === 0 ? (
    <div></div>
  ) : (
    <div className="delete-matter-button-div">
      <button className="delete-matter-button" onClick={handleOpen}>
        Delete Note
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to delete this note?"?
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button className="yes-delete-button" onClick={handleDelete}>
              Yes
            </button>
            <button className="no-delete-button" onClick={handleClose}>
              No
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteNoteButton;
