import React, { useContext } from "react";
import ToolsPanel from "../components/ToolsPanel";
import DetailsPanel from "../components/DetailsPanel";
import MainPanel from "../components/MainPanel";
import DayWindow from "../components/calendar/DayWindow";
import { CalendarContext } from "../context/CalendarContext";

export default function DayScreen() {
  const { chosenDay, setChosenYear, setChosenMonth, setChosenDay } =
    useContext(CalendarContext);
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date();
  const [year, setYear] = React.useState(date.getFullYear().toString());
  const handleYearChange = (event) => {
    setYear(event);
    setChosenYear(event);
  };

  const [month, setMonth] = React.useState(MONTHS[date.getMonth()]);
  const handleMonthChange = (event) => {
    setMonth(event);
    setChosenMonth(event);
  };

  const [day, setDay] = React.useState(date.getDay() + 1);
  const handleSelectedDay = (event) => {
    setDay(event);
    setChosenDay(event);
  };

  return (
    <div className="grid-arrangement">
      <ToolsPanel
        appearance="day-screen"
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />
      <MainPanel />
      <DayWindow />
      <DetailsPanel appearance="day-screen" />
    </div>
  );
}
