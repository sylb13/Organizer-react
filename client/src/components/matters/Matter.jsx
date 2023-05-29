import React, { useContext, useEffect, useState } from "react";
import { MattersContext } from "../../context/MattersContext";

function Matter({
  isDone,
  isExpired,
  content,
  matterId,
  hasToDoList,
  isAssignedInCalendar,
  hasCategory,
  hasAlertSet,
}) {
  const {
    activeMatter,
    setActiveMatter,
    setMatterTitle,
    setActiveToDoList,
    hideOrShowDoneMatters,
    hideOrShowExpiredMatters,
  } = useContext(MattersContext);

  const [mattersContent, setMattersContent] = useState(content);
  // const [toDoListFlag, setToDoListFlag] = useState(hasToDoList);
  const [isDoneFlag, setIsDoneFlag] = useState(isDone);
  // const [categoryFlag, setCategoryFlag] = useState(hasCategory);
  // const [dateFlag, setDateFlag] = useState(isAssignedInCalendar);

  useEffect(() => {
    if (activeMatter.id === matterId) {
      if (activeMatter.isDone === true) {
        setIsDoneFlag(true);
      } else {
        setIsDoneFlag(false);
      }
      // if (activeMatter.toDoListId !== null) {
      //   setToDoListFlag(true);
      //   hasToDoList = true;
      // } else {
      //   setToDoListFlag(false);
      //   hasToDoList = false;
      // }
      // if (activeMatter.categoryId !== null) {
      //   setCategoryFlag(true);
      //   hasCategory = true;
      // } else {
      //   setCategoryFlag(false);
      //   hasCategory = false;
      // }
      // if (activeMatter.startDate !== null) {
      //   setDateFlag(true);
      //   isAssignedInCalendar = true;
      // } else {
      //   setDateFlag(false);
      //   isAssignedInCalendar = false;
      // }
    }
  }, [
    activeMatter.isDone,
    // activeMatter.startDate,
    // activeMatter.toDoListId,
    // activeMatter.categoryId,
  ]);

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

  return hideOrShowDoneMatters === true && isDoneFlag === true ? (
    <div hidden={true}></div>
  ) : hideOrShowExpiredMatters === true && isExpired === true ? (
    <div hidden={true}></div>
  ) : (
    <div
      className="matter-div"
      onClick={() => {
        handleOnMatterClick();
      }}
      style={
        activeMatter.id === matterId
          ? { backgroundColor: "#fce5b0" }
          : isExpired === true && isDoneFlag === true
          ? { opacity: "0.7", filter: "blur(1px)", backgroundColor: "#CCCCCC" }
          : isExpired === true
          ? { opacity: "0.7", filter: "blur(1px)" }
          : isDoneFlag === true
          ? { backgroundColor: "#CCCCCC" }
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
