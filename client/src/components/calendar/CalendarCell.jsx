import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import CalendarEvent from "./CalendarEvent";
import { Link } from "react-router-dom";

function CalendarCell(props) {
  let stupidCounterToHandleStupidLackOfDoubleClickInStupidReact = 0;
  const { goToDayScreen, chosenMonth, chosenYear } =
    useContext(CalendarContext);
  const handleClick = (event) => {
    const day = parseInt(event.target.innerText);
    props.onDay(day);
    console.log(
      "Kliknąłem w taki dzień:  " + chosenYear + "-" + chosenMonth + "-" + day
    );
  };
  const handleDoubleClick = () => {
    stupidCounterToHandleStupidLackOfDoubleClickInStupidReact =
      stupidCounterToHandleStupidLackOfDoubleClickInStupidReact + 1;
    if (stupidCounterToHandleStupidLackOfDoubleClickInStupidReact === 2) {
      console.log("Jestem w handleDoubleClick");
      stupidCounterToHandleStupidLackOfDoubleClickInStupidReact = 0;
      goToDayScreen(); //to tak tylko dla zasyngalizowania co tu ma się dziać, ta funkcja normalnie nie działa
    }
  };
  // Ostatecznie usunąłem opcję chowania i pokazywania wygaslych spraw w kalendarzu bo... przecież to widać gołym okiem które wygasly :D
  // const checkIfExpired = (matter) => {
  //   if (matter.endDate !== null) {
  //     let currentDate = new Date();
  //     let dateToCompare;
  //     if (matter.endTime !== null) {
  //       dateToCompare = new Date(
  //         Date.parse(matter.endDate.concat(" ", matter.endTime))
  //       );
  //       if (currentDate > dateToCompare) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       dateToCompare = new Date(
  //         Date.parse(matter.endDate.concat(" 00:00:00 " + currentGMT))
  //       );
  //       if (currentDate > dateToCompare) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  const MATTERS = props.event?.map((matter) => (
    <CalendarEvent
      key={props.event.indexOf(matter)}
      matterDetails={props.event[props.event.indexOf(matter)].matter}
      //   title={props.event[props.event.indexOf(matter)].matter.title}
      // isExpired={checkIfExpired(props.event[props.event.indexOf(matter)].matter)}
    />
  ));

  return (
    <td onClick={handleDoubleClick}>
      <div
        className="cell-content"
        onClick={handleClick}
        style={
          props.selected
            ? { backgroundColor: "#fce5b0" }
            : { backgroundColor: "#FFF8E6" }
        }
        // onDoubleClick={handleDoubleClick}
      >
        <Link
          onClick={handleClick}
          className="day-number-ahref"
          to={"/day-screen"}
          value={props.dayNumber}
        >
          {props.dayNumber}
        </Link>
        {/* <a
          onClick={handleClick}
          className="day-number-ahref"
          href="/day-screen"
          value={props.dayNumber}
        >
          {props.dayNumber}
        </a> */}
        {MATTERS}
      </div>
    </td>
  );
}

export default CalendarCell;
