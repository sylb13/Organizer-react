import React, { useContext, useEffect } from "react";
import ExpandingButton from "./ExpandingButton";
import YearButton from "./calendar/YearButton";
import MonthButton from "./calendar/MonthButton";
import SortMattersButton from "./matters/SortMattersButton";
import { MattersContext } from "../context/MattersContext";

function ToolsPanel(props) {
  const { alertsList, getAlertList } = useContext(MattersContext);
  const [isPanelHidden, setIsPanelHidden] = React.useState(true);
  const dateEngine = new Date();
  useEffect(() => {
    if (alertsList !== null) {
      alertsList.map((alert) => createAlerts(alert));
    }
  }, [alertsList]);

  const createAlerts = (x) => {
    console.log(x.date);
    console.log(dateEngine.getTime(x.date)); // data z alertu jest w złym formacie.... nie mam zielonego pojęcia jak ją przekonwertować, a przez to
    //że jest w złym formacie to getTime domyślnie bierze sobie obecną datę
    let alertDate = new Date(x.date);
    let alertDateUTC = alertDate.toUTCString();
    let alertDateUTCDate = new Date(alertDateUTC);
    let alertDateMiliseconds = alertDateUTCDate.getTime();
    let currentDate = dateEngine.getTime();
    console.log(alertDate);
    console.log(currentDate);
    console.log(alertDateMiliseconds - currentDate);
    if (alertDateMiliseconds - currentDate > 0) {
      setTimeout(() => {
        alert("Chyba działa");
      }, alertDateMiliseconds - currentDate);
    }
  };

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

  // const probna = () => {
  //   getAlertList();
  // };

  if (props.appearance === "calendar" || props.appearance === "day-screen") {
    return (
      <div id="tools-panel" className="tools-panel">
        <div className="tools-div">
          <YearButton onSubmit={changeYear} />
          <MonthButton onSubmit={changeMonth} />
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
        <div className="tools-div"></div>
        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "right" : "left"}
        />
      </div>
    );
  }
}

export default ToolsPanel;
