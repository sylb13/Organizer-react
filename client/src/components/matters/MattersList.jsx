import React, { useContext, useEffect } from "react";
import Matter from "./Matter";
import { MattersContext } from "../../context/MattersContext";

function MattersList() {
  const {
    sort,
    matters,
    getMatters,
    activeMatter,
    hideOrShowDoneMatters,
    hideOrShowExpiredMatters,
    currentGMT,
  } = useContext(MattersContext);

  useEffect(() => {
    console.log("matters_list_use_effect");
    getMatters();
  }, [
    sort,
    activeMatter.id,
    activeMatter.isDone,
    hideOrShowDoneMatters,
    hideOrShowExpiredMatters,
  ]);

  function handleClickOnMatter(matterId) {
    let markedMatter = matterId.toString();
    console.log(markedMatter);
  }

  const checkIfExpired = (matter) => {
    if (matter.endDate !== null) {
      let currentDate = new Date();
      let dateToCompare;
      if (matter.endTime !== null) {
        dateToCompare = new Date(
          Date.parse(matter.endDate.concat(" ", matter.endTime))
        );
        if (currentDate > dateToCompare) {
          return true;
        } else {
          return false;
        }
      } else {
        dateToCompare = new Date(
          Date.parse(matter.endDate.concat(" 00:00:00 " + currentGMT))
        );
        if (currentDate > dateToCompare) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  const MATTER_LIST = matters?.map((matter) => (
    <Matter
      key={matter.id}
      isDone={matter.isDone}
      isExpired={checkIfExpired(matter)}
      onMatter={handleClickOnMatter}
      matterId={matter.id}
      content={matter.title}
      hasToDoList={matter.toDoListId !== null ? "true" : "false"}
      isAssignedInCalendar={matter.startDate !== null ? "true" : "false"}
      hasCategory={matter.categoryId ? "true" : "false"}
      // hasAlertSet={matter.alertId ? "true" : "false"}
    />
  ));

  return (
    <div className="matters-list">
      {MATTER_LIST ? MATTER_LIST : <div>loading</div>}
    </div>
  );
}

export default MattersList;
