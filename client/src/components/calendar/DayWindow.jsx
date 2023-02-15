import React from "react";
import DayEvent from "./DayEvent";
import { CalendarContext } from "../../context/CalendarContext";
import { useContext } from "react";
import { useEffect } from "react";

export default function DayWindow(props) {
  const { chosenDay, chosenMonth, chosenYear, calendarMatters } =
    useContext(CalendarContext);

  useEffect(() => {
    console.log("useEffect pierwszy");
  }, [chosenMonth, chosenYear]);

  const filterFunction = (value) => {
    const startDayFromDB = parseInt(value.startDate.slice(8, 10));
    const dateToCompare = parseInt(chosenDay);

    if (value.endDate !== null) {
      const endDayFromDB = parseInt(value.endDate.slice(8, 10));
      if (dateToCompare >= startDayFromDB && dateToCompare <= endDayFromDB)
        return value;
    } else {
      if (startDayFromDB === dateToCompare) return value;
    }
  };

  const dayMatters = calendarMatters.filter(filterFunction);

  const MATTERS = dayMatters.map((matter) => <DayEvent />);
  const MONTHS = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };
  return (
    <div className="day-panel">
      <div className="day-window">
        <div className="day-window-title-label">
          <p style={{ fontSize: "58px", margin: "0px" }}>{chosenDay}</p>
          <div style={{ margin: "0px 20px" }}>
            <p
              style={{
                fontSize: "20px",
                margin: "12px 10px 0px 10px",
                textAlign: "center",
              }}
            >
              Saturday
            </p>
            <h4 style={{ margin: "5px" }}>
              {MONTHS[chosenMonth] + " " + chosenYear}
            </h4>
          </div>
        </div>
        <div
          style={{
            gridRow: "2/3",
            borderRadius: "0px 0px 15px 15px",
            padding: "10px 20px",
          }}
        >
          {MATTERS}
        </div>
      </div>
    </div>
  );
}
