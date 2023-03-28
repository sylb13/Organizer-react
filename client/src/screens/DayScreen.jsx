import React, { useContext, useEffect } from "react";
import ToolsPanel from "../components/ToolsPanel";
import DetailsPanel from "../components/DetailsPanel";
import MainPanel from "../components/MainPanel";
import DayWindow from "../components/calendar/DayWindow";
import { CalendarContext } from "../context/CalendarContext";

export default function DayScreen() {
  const {
    chosenDay,
    chosenMonth,
    chosenYear,
    setChosenYear,
    setChosenMonth,
    setChosenDay,
    getCalendarMatters,
  } = useContext(CalendarContext);
  const getMonthNumber = (monthName) => {
    switch (monthName) {
      case "Jan":
        return 0;
      case "Feb":
        return 1;
      case "Mar":
        return 2;
      case "Apr":
        return 3;
      case "May":
        return 4;
      case "Jun":
        return 5;
      case "Jul":
        return 6;
      case "Aug":
        return 7;
      case "Sep":
        return 8;
      case "Oct":
        return 9;
      case "Nov":
        return 10;
      case "Dec":
        return 11;
      default:
        break;
    }
  };

  // const date = new Date();

  const [year, setYear] = React.useState(chosenYear);
  const handleYearChange = (event) => {
    setYear(event);
    setChosenYear(event);
  };

  const [month, setMonth] = React.useState(chosenMonth);
  const handleMonthChange = (event) => {
    setMonth(event);
    setChosenMonth(event);
  };

  const [day, setDay] = React.useState(chosenDay);
  const handleSelectedDay = (event) => {
    setDay(event);
    setChosenDay(event);
  };

  const showDayBefore = () => {
    let fullDateOfDayBefore = new Date(
      parseInt(chosenYear),
      getMonthNumber(chosenMonth),
      chosenDay - 1
    );
    const fullDateOfDayBeforeString = fullDateOfDayBefore.toString();
    console.log("DAY BEFORE   " + fullDateOfDayBeforeString);
    const newDay = fullDateOfDayBeforeString.slice(8, 10);
    const newMonth = fullDateOfDayBeforeString.slice(4, 7);
    const newYear = fullDateOfDayBeforeString.slice(11, 15);
    console.log("DAY BEFORE   " + newDay + " " + newMonth + " " + newYear);
    handleYearChange(newYear);
    handleMonthChange(newMonth);
    handleSelectedDay(parseInt(newDay));
  };
  const showDayAfter = () => {
    let fullDateOfDayAfter = new Date(
      parseInt(chosenYear),
      getMonthNumber(chosenMonth),
      chosenDay + 1
    );
    const fullDateOfDayAfterString = fullDateOfDayAfter.toString();
    console.log("DAY AFTER   " + fullDateOfDayAfterString);
    const newDay = fullDateOfDayAfterString.slice(8, 10);
    const newMonth = fullDateOfDayAfterString.slice(4, 7);
    const newYear = fullDateOfDayAfterString.slice(11, 15);
    console.log("DAY AFTER   " + newDay + " " + newMonth + " " + newYear);
    handleYearChange(newYear);
    handleMonthChange(newMonth);
    handleSelectedDay(parseInt(newDay));
  };

  const letsCheatCalendarContext = () => {
    console.log("Context has been cheated buaahaha");
  };

  useEffect(() => {
    getCalendarMatters(month, year, letsCheatCalendarContext);
    console.log("Use effect z DayScreen");
  }, [chosenMonth, chosenYear, chosenDay]);

  return (
    <div className="grid-arrangement">
      <ToolsPanel
        appearance="day-screen"
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />

      <MainPanel />
      <DayWindow showDayBefore={showDayBefore} showDayAfter={showDayAfter} />
      <DetailsPanel appearance="day-screen" />
    </div>
  );
}
