import React from "react";
import CalendarCell from "./CalendarCell";
import calendarDB from "../../utilities/calendarDB";

function Calendar(props) {
  let selectedDay = props.day;

  // console.log(props.month);
  // console.log(props.year);
  let monthFromProps = props.month + "-" + props.year;
  // console.log(monthFromProps);
  let monthDetails = [];
  let month = calendarDB.find((element) => monthFromProps === element.name);
  // console.log(month);
  for (let i = 1; i <= 42; i++) {
    if (
      month.firstWeekdayOfMonth <= i &&
      i < month.daysNumber + month.firstWeekdayOfMonth
    ) {
      monthDetails.push({
        key: i - 1,
        dayNumber: i + 1 - month.firstWeekdayOfMonth,
      });
      // console.log(props.events);
    } else {
      monthDetails.push({ key: i - 1, dayNumber: "" });
    }
  }
  // console.log(monthDetails);
  const row1 = monthDetails.filter(function (part) {
    return part.key >= 0 && part.key <= 6;
  });
  const row2 = monthDetails.filter(function (part) {
    return part.key >= 7 && part.key <= 13;
  });
  const row3 = monthDetails.filter(function (part) {
    return part.key >= 14 && part.key <= 20;
  });
  const row4 = monthDetails.filter(function (part) {
    return part.key >= 21 && part.key <= 27;
  });
  const row5 = monthDetails.filter(function (part) {
    return part.key >= 28 && part.key <= 34;
  });
  const row6 = monthDetails.filter(function (part) {
    return part.key >= 35 && part.key <= 41;
  });
  // console.log(row1);

  return (
    <section className="calendar-section">
      <div className="calendar">
        <table>
          <thead>
            <tr>
              <th className="monday-column" scope="col"></th>
              <th className="tuesday-column" scope="col"></th>
              <th className="wednesday-column" scope="col"></th>
              <th className="thursday-column" scope="col"></th>
              <th className="friday-column" scope="col"></th>
              <th className="saturday-column" scope="col"></th>
              <th className="sunday-column" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {row1.map((row) => (
                <CalendarCell
                  dayNumber={row.dayNumber}
                  onDay={props.onDay}
                  selected={selectedDay === row.dayNumber ? true : false}
                  event={
                    row.dayNumber !== ""
                      ? props.events[row.dayNumber - 1]
                      : null
                  }
                />
              ))}
            </tr>
            <tr>
              {row2.map((row) => (
                <CalendarCell
                  dayNumber={row.dayNumber}
                  onDay={props.onDay}
                  selected={selectedDay === row.dayNumber ? true : false}
                  event={
                    row.dayNumber !== ""
                      ? props.events[row.dayNumber - 1]
                      : null
                  }
                />
              ))}
            </tr>
            <tr>
              {row3.map((row) => (
                <CalendarCell
                  dayNumber={row.dayNumber}
                  onDay={props.onDay}
                  selected={selectedDay === row.dayNumber ? true : false}
                  event={
                    row.dayNumber !== ""
                      ? props.events[row.dayNumber - 1]
                      : null
                  }
                />
              ))}
            </tr>
            <tr>
              {row4.map((row) => (
                <CalendarCell
                  dayNumber={row.dayNumber}
                  onDay={props.onDay}
                  selected={selectedDay === row.dayNumber ? true : false}
                  event={
                    row.dayNumber !== ""
                      ? props.events[row.dayNumber - 1]
                      : null
                  }
                />
              ))}
            </tr>
            {month.rows >= 4 && (
              <tr>
                {row5.map((row) => (
                  <CalendarCell
                    dayNumber={row.dayNumber}
                    onDay={props.onDay}
                    selected={selectedDay === row.dayNumber ? true : false}
                    event={
                      row.dayNumber !== ""
                        ? props.events[row.dayNumber - 1]
                        : null
                    }
                  />
                ))}
              </tr>
            )}
            {month.rows > 5 && (
              <tr>
                {row6.map((row) => (
                  <CalendarCell
                    dayNumber={row.dayNumber}
                    onDay={props.onDay}
                    selected={selectedDay === row.dayNumber ? true : false}
                    event={
                      row.dayNumber !== ""
                        ? props.events[row.dayNumber - 1]
                        : null
                    }
                  />
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Calendar;
