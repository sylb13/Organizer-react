import React, { useContext, useEffect } from "react";
import { MattersContext } from "../context/MattersContext";
import EventDetails from "./calendar/EventDetails";
import ExpandingButton from "./ExpandingButton";
import AlertWindow from "./matters/AlertWindow";
import CategoriesWindow from "./matters/CategoriesWindow";
import HandyEndCalendar from "./matters/HandyEndCalendar";
import HandyStartCalendar from "./matters/HandyStartCalendar";
import ToDoList from "./matters/ToDoList";

function DetailsPanel(props) {
  const { activeMatter } = useContext(MattersContext);
  const [isPanelHidden, setIsPanelHidden] = React.useState(true);

  useEffect(() => {}, [activeMatter]);

  function handleButton() {
    setIsPanelHidden(!isPanelHidden);
    const detailsPanelById = document.getElementById("details-panel");
    isPanelHidden === true
      ? detailsPanelById.classList.add("details-panel-expanded")
      : detailsPanelById.classList.remove("details-panel-expanded");
  }

  if (props.appearance === "calendar") {
    return (
      <div id="details-panel" className="details-panel">
        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "left" : "right"}
        />
        <div className="details-div">
          <EventDetails />
        </div>
      </div>
    );
  } else if (props.appearance === "matters") {
    return (
      <div id="details-panel" className="details-panel">
        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "left" : "right"}
        />
        <div className="details-div">
          <ToDoList />
          <HandyStartCalendar />
          <CategoriesWindow />
          <AlertWindow />
        </div>
      </div>
    );
  } else if (props.appearance === "day-screen") {
    return (
      <div id="details-panel" className="details-panel">
        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "left" : "right"}
        />
        <div className="details-div"></div>
      </div>
    );
  } else if (props.appearance === "categories") {
    return (
      <div id="details-panel" className="details-panel">
        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "left" : "right"}
        />
        <div className="details-div"></div>
      </div>
    );
  }
}

export default DetailsPanel;
