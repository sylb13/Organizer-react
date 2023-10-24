import React, { useContext, useEffect } from "react";
import ExpandingButton from "./ExpandingButton";
import YearButton from "./calendar/YearButton";
import MonthButton from "./calendar/MonthButton";
import SortMattersButton from "./matters/SortMattersButton";
import { MattersContext } from "../context/MattersContext";
import MyNotesWindow from "./notes/MyNotesWindow";
import FilterSwitches from "./matters/FilterSwitches";

function ToolsPanel(props) {
  const [isPanelHidden, setIsPanelHidden] = React.useState(true);
  // const dateEngine = new Date();
  // let timeoutIds = [];
  // useEffect(() => {
  //   if (alertsList !== null && alertsList !== undefined) {
  //     console.log(timeoutIds);
  //     timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  //     alertsList.map((alert) => createAlerts(alert));
  //   }
  // }, [alertsList]);

  // const createAlerts = (x) => {
  //   console.log("Wchodzę w createAlerts");
  //   let alertDate = new Date(x.date);
  //   let alertDateUTC = alertDate.toUTCString();
  //   let alertDateUTCDate = new Date(alertDateUTC);
  //   let alertDateMiliseconds = alertDateUTCDate.getTime();
  //   console.log(alertDateMiliseconds);
  //   let currentDate = dateEngine.getTime();
  //   console.log(currentDate);
  //   // console.log(alertDateMiliseconds - currentDate);
  //   if (alertDateMiliseconds - currentDate > 0) {
  //     console.log("Zaraz stwrzę alert");
  //     const timeoutId = setTimeout(() => {
  //       alert("Alert związany z wydarzeniem! Alert ID: " + timeoutId);
  //     }, alertDateMiliseconds - currentDate);
  //     console.log(timeoutId);
  //     timeoutIds.push(timeoutId);
  //   }
  // };

  function handleButton() {
    setIsPanelHidden(!isPanelHidden);
    const toolsPanelById = document.getElementById("tools-panel");
    isPanelHidden === true
      ? toolsPanelById.classList.add("tools-panel-expanded")
      : toolsPanelById.classList.remove("tools-panel-expanded");
  }

  function changeMonth(eventFromMonthButton) {
    props.onMonthChange(eventFromMonthButton);
  }

  function changeYear(eventFromYearButton) {
    props.onYearChange(eventFromYearButton);
  }

  if (props.appearance === "calendar" || props.appearance === "day-screen") {
    return (
      <div id="tools-panel" className="tools-panel">
        <div className="tools-div">
          <YearButton onSubmit={changeYear} />
          <MonthButton onSubmit={changeMonth} />
          <FilterSwitches show="done-only" />
          {/* <button
            style={{ width: "300px", height: "200px" }}
            onClick={() => {
              probna();
            }}
          ></button> */}
        </div>

        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "right" : "left"}
        />
      </div>
    );
  } else if (props.appearance === "matters") {
    return (
      <div id="tools-panel" className="tools-panel">
        <div className="tools-div">
          <SortMattersButton />
          <FilterSwitches show="both" />
          {/* <button
            style={{ width: "300px", height: "200px" }}
            onClick={() => {
              probna();
            }}
          ></button> */}
        </div>
        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "right" : "left"}
        />
      </div>
    );
  } else if (props.appearance === "notes") {
    return (
      <div id="tools-panel" className="tools-panel">
        <div className="tools-div">
          <MyNotesWindow />
        </div>
        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "right" : "left"}
        />
      </div>
    );
  }
}

export default ToolsPanel;
