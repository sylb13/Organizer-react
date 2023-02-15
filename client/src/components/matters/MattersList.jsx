import React, { useContext, useEffect } from "react";
import Matter from "./Matter";
import { MattersContext } from "../../context/MattersContext";

function MattersList() {
  const { sort, matters, getMatters } = useContext(MattersContext);

  useEffect(() => {
    console.log("matters_list_use_effect");
    getMatters();
  }, [sort]);

  function handleClickOnMatter(matterId) {
    let markedMatter = matterId.toString();
    console.log(markedMatter);
  }

  const MATTER_LIST = matters?.map((matter) => (
    <Matter
      key={matter.id}
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
