import React from "react";

function AddNewToDoItemButton(props) {
  return (
    <button className="add-new-todoitem-button" onClick={props.click}></button>
  );
}

export default AddNewToDoItemButton;
