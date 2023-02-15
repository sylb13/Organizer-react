import React, { useContext, useEffect, useState } from "react";
import { MattersContext } from "../../context/MattersContext";

function Matter({
  content,
  matterId,
  hasToDoList,
  isAssignedInCalendar,
  hasCategory,
  hasAlertSet,
}) {
  const { activeMatter, setActiveMatter, setMatterTitle, setActiveToDoList } =
    useContext(MattersContext);

  const [mattersContent, setMattersContent] = useState(content);

  const handleMatterChange = (event) => {
    setMattersContent(event.target.value);
    setMatterTitle(event.target.value, matterId);
  };

  const handleOnMatterClick = async () => {
    await setActiveMatter(matterId);

    await setActiveToDoList(matterId);
    // if (activeMatter.toDoListId !== null) {
    //   console.log(activeMatter.toDoListId);
    //   await setActiveToDoList(matterId);
    // }
  };

  return (
    <div
      className="matter-div"
      onClick={() => {
        handleOnMatterClick();
      }}
      style={
        activeMatter.id === matterId
          ? { backgroundColor: "#fce5b0" }
          : { backgroundColor: "#FFF8E6" }
      }
    >
      <textarea
        className="matter-textarea"
        rows="4"
        cols="10"
        wrap="hard"
        spellCheck="false"
        onChange={handleMatterChange}
        defaultValue={mattersContent}
      >
        {/* {mattersContent} consola wymusza użycie defaultValue, jeśli będzie to sprawiać jakieś problemy to zmień z powrotem na to */}
      </textarea>

      <div className="matter-addons-div">
        {hasToDoList === "true" && (
          <img
            className="addon-image"
            src="./to-do-list.png"
            alt="to do list"
          ></img>
        )}
        {isAssignedInCalendar === "true" && (
          <img
            className="addon-image"
            src="./calendar.png"
            alt="calendar"
          ></img>
        )}
        {hasCategory === "true" && (
          <img
            className="addon-image"
            src="./category.png"
            alt="category"
          ></img>
        )}
        {hasAlertSet === "true" && (
          <img className="addon-image" src="./alert.png" alt="alert"></img>
        )}
      </div>
    </div>
  );
}

//style={props.selected ? {backgroundColor: "#fce5b0"} : {backgroundColor: "#FFF8E6"}}

export default Matter;
