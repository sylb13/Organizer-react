import React, { useContext } from "react";
import { Checkbox } from "@mui/material";
import { MattersContext } from "../../context/MattersContext";

function ToDoListItem(props) {
  const { setToDoItemText, deleteToDoItem, markAsDone } =
    useContext(MattersContext);
  const [ticked, setTicked] = React.useState(props.isDone);
  const [toDoContent, setToDoContent] = React.useState(props.content);
  const handleChange = async (event) => {
    let done = event.target.checked;
    console.log(done);
    setTicked(done);
    console.log(ticked);
    await markAsDone(done, props.itemId);
  };
  const handleContentChange = (event) => {
    setToDoContent(event.target.value);
    setToDoItemText(event.target.value, props.itemId);
  };
  const handleDelete = () => {
    deleteToDoItem(props.itemId);
    //nie rozumiem dlaczego po usunięciu itemu resetują się wszystkie contexty...
  };

  return (
    <div className="todolist-item">
      <form className="todolist-item-form">
        <Checkbox
          checked={ticked ? true : false}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          color="secondary"
        />
        <input
          className="todolist-item-input"
          placeholder="Next to do is..."
          value={toDoContent}
          onChange={handleContentChange}
        ></input>
        <button
          className="delete-todoitem-button"
          onClick={handleDelete}
        ></button>
      </form>
    </div>
  );
}

export default ToDoListItem;
