import React, { useContext, useEffect } from "react";
import { MattersContext } from "../context/MattersContext";
import EventDetails from "./calendar/EventDetails";
import ExpandingButton from "./ExpandingButton";
import AlertWindow from "./matters/AlertWindow";
import CategoriesWindow from "./matters/CategoriesWindow";
import HandyStartCalendar from "./matters/HandyStartCalendar";
import ToDoList from "./matters/ToDoList";
import DownloadNoteButton from "./notes/DowloadNoteButton";
import StatusCheckbox from "./matters/StatusCheckbox";

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
          <StatusCheckbox />
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
        <div className="details-div">
          <StatusCheckbox />
          <ToDoList />
          <CategoriesWindow />
          <h2>
            Tu jeszcze musze dodać Alerty ale dopiero jak będą działac
            poprawnie. Kalendarza zdecydowalem sie nie dodawać
          </h2>
        </div>
      </div>
    );
  } else if (props.appearance === "notes") {
    return (
      <div id="details-panel" className="details-panel">
        <ExpandingButton
          click={handleButton}
          direction={isPanelHidden ? "left" : "right"}
        />
        <div className="details-div" style={{ alignItems: "center" }}>
          <DownloadNoteButton />
        </div>
      </div>
    );
  }
}

export default DetailsPanel;
