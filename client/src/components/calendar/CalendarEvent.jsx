import React, { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import { MattersContext } from "../../context/MattersContext";

export default function CalendarEvent(props) {
  // useEffect(() => {
  //   console.log("refreshed");
  // }, [props]);
  const { selectEvent, selectedEvent } = useContext(CalendarContext);
  const { categories, hideOrShowDoneMatters } = useContext(MattersContext);
  // const [selected, setSelected] = useState(false);
  const handleClick = () => {
    //    setSelected(!selected);
    if (selectedEvent.id === props.matterDetails.id) {
      selectEvent({ id: null });
    } else {
      selectEvent(props.matterDetails);
    }
  };
  //   const showProps = () => {
  //     console.log(props);
  //   };

  const findOutColor = () => {
    let x = categories;
    let found = x.find(
      (element) => element.id === props.matterDetails.categoryId
    );
    console.log("Found: " + found);
    if (found === undefined) {
      return "#d3d3d3";
    } else {
      return found.color;
    }
  };

  return hideOrShowDoneMatters === true &&
    props.matterDetails.isDone === true ? (
    <div hidden={true}></div>
  ) : (
    <div
      className="calendar-event"
      onClick={handleClick}
      style={
        selectedEvent.id === props.matterDetails.id
          ? { backgroundColor: "#9b72aa" }
          : { backgroundColor: findOutColor() }
      }
    >
      <div className="calendar-event-text-div">
        <p className="calendar-event-text-paragraph">
          {props.matterDetails.title}
        </p>
      </div>
    </div>
  );
}
