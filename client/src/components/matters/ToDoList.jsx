import React, { useContext, useEffect } from "react";
import ToDoListItem from "./ToDoListItem";
import AddNewToDoItemButton from "./AddNewToDoItemButton";
import { MattersContext } from "../../context/MattersContext";
import { Switch } from "@mui/material";

function ToDoList() {
  const {
    addNewToDoItem,
    addNewToDoList,
    activeMatter,
    activeToDoList,
    toDoList,
    deleteToDoList,
    setActiveToDoList,
  } = useContext(MattersContext);

  useEffect(() => {
    setToDoListSwitch(activeMatter.toDoListId !== null ? true : false);
  }, [activeMatter, activeToDoList]);
  const [toDoListSwitch, setToDoListSwitch] = React.useState(
    activeMatter.toDoListId !== null ? true : false
  );

  const handleSwitchChange = (event) => {
    const { checked, name } = event.target;
    if (checked === false) {
      deleteToDoList(activeToDoList);
      setToDoListSwitch(false);
    } else {
      addNewToDoList(activeMatter.id);
      setActiveToDoList(activeMatter.id);
      setToDoListSwitch(true);
    }
  };
  const TODOLIST = toDoList?.map((toDoItem) => (
    <li>
      <ToDoListItem
        key={toDoItem.id}
        itemId={toDoItem.id}
        content={toDoItem.content}
        isDone={toDoItem.isDone}
      />
    </li>
  ));

  return activeMatter.id === 0 ? (
    <div></div>
  ) : (
    <div
      className={
        toDoListSwitch === true ? "todolist-div" : "disabled-todolist-div"
      }
    >
      <div className="todolist-title">
        <h5>To Do List</h5>
        <Switch
          name="toDoListSwitch"
          checked={toDoListSwitch}
          onChange={handleSwitchChange}
          color="secondary"
        />
      </div>
      {toDoListSwitch === true ? (
        <div className="todolist-items-div">
          <ul>{TODOLIST}</ul>
          <AddNewToDoItemButton click={addNewToDoItem} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ToDoList;
