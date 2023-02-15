import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useContext, useEffect } from "react";
import { MattersContext } from "../../context/MattersContext";
import { TimePicker } from "@mui/x-date-pickers";
import { Switch } from "@mui/material";

export default function HandyEndCalendar() {
  const { activeMatter, setActiveMatter, setMattersDate, setMattersTime } =
    useContext(MattersContext);
  useEffect(() => {
    setDate(() => {
      let mattersDate = new Date();
      console.log("Jestem przed ifem " + mattersDate);
      if (activeMatter.id !== 0) {
        if (activeMatter.endDate !== null) {
          if (activeMatter.endTime !== null) {
            mattersDate = activeMatter.endDate.concat(
              " ",
              activeMatter.endTime
            );
          } else {
            mattersDate = activeMatter.endDate.concat(" 00:00:00 GMT+0100");
          }
        }
      }
      console.log("Jestem po ifie " + mattersDate);
      return mattersDate;
    });
    setEndTime(() => {
      let mattersTime = new Date();
      console.log("Jestem przed ifem " + mattersTime);
      if (activeMatter.id !== 0) {
        if (activeMatter.endDate !== null) {
          mattersTime = activeMatter.endDate.concat(" ", activeMatter.endTime);
        }
      }
      console.log("Jestem po ifie " + mattersTime);
      return mattersTime;
    });
    setEndDateSwitch(activeMatter.endDate !== null ? true : false);
    setEndTimeSwitch(activeMatter.endTime !== null ? true : false);
  }, [activeMatter]);
  const [date, setDate] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [endDateSwitch, setEndDateSwitch] = React.useState(false); //do zmiany, w zależności od tego co jest w bazie
  const [endTimeSwitch, setEndTimeSwitch] = React.useState(false);

  const minDate = new Date(2020, 0, 1, 0, 0, 0);
  const maxDate = new Date(2030, 11, 31, 23, 59, 59);

  const handleSwitchChange = (event) => {
    const { checked, name } = event.target;
    console.log(checked + " " + name);
    if (name === "endDateSwitch") {
      setEndDateSwitch(checked);
      if (checked === false) {
        setMattersDate("end", null);
        setMattersTime("end", null);
        setEndTimeSwitch(false);
      } else {
        //dodane przy próbie poprawy działania
        setDate(activeMatter.startDate); //dodane przy próbie poprawy działania
        setEndTime(activeMatter.startTime); //dodane przy próbie poprawy działania
        setMattersDate("end", activeMatter.startDate); //dodane przy próbie poprawy działania
        setMattersTime("end", activeMatter.startTime); //dodane przy próbie poprawy działania
      }
    } else {
      setEndTimeSwitch(checked);
      if (checked === false) {
        setEndTime(null); //dodane przy próbie poprawy działania
        setMattersTime("end", null); //dodane przy próbie poprawy działania
      } else {
        //dodane przy próbie poprawy działania
        // nie musze obsługiwać sytuacji włączenia endTimeSwitch gdy nie jest ustawiony startTime bo to robi CSS
        setEndTime(null); //dodane przy próbie poprawy działania
        setMattersTime("end", null); //dodane przy próbie poprawy działania
      }
    }
  };

  const handleDateChange = (date) => {
    let dateToCompare;
    let startOrEnd = "end";
    let dateToString;
    if (activeMatter.startTime === null) {
      dateToCompare = new Date(
        Date.parse(activeMatter.startDate.concat(" 00:00:00 GMT+0100"))
      );
    } else {
      dateToCompare = new Date(
        Date.parse(activeMatter.startDate.concat(" ", activeMatter.startTime))
      );
    }

    if (date < dateToCompare) {
      setDate(dateToCompare);
      dateToString = dateToCompare.toString();
      alert("Podana data jest niepoprawna");
    } else {
      setDate(date);
      dateToString = date.toString();
    }

    const dateToSplit = dateToString.split(" ");
    let weekday = dateToSplit[0];
    let monthName = dateToSplit[1];
    let startsDay = dateToSplit[2];
    let year = dateToSplit[3];
    const dateToContext = weekday.concat(
      " ",
      monthName,
      " ",
      startsDay,
      " ",
      year
    );
    setMattersDate(startOrEnd, dateToContext); // jakaś metoda z kontekstu
    setActiveMatter(activeMatter.id);
  };

  const handleTimeChange = (changedTime) => {
    let dateToCompare;
    let timeToString;
    const startOrEnd = "end";
    let timeToContext;
    let timeToSplit;
    if (activeMatter.startTime === null) {
      //ta sytuacja już nie ma prawa sie wydarzyć po poprawach w HandyStartCalendar, ale nie usuwam w razie w.
      timeToContext = null;
      setEndTime(null);
      alert(
        "Nie można ustawić czasu zakończenia zadania jeśli nie ustawiono czasu rozpoczecia."
      );
    } else {
      dateToCompare = new Date(
        Date.parse(activeMatter.startDate.concat(" ", activeMatter.startTime))
      );
      console.log("Porównuję to: " + changedTime + " z tym: " + dateToCompare);
      if (changedTime < dateToCompare) {
        alert("Podany czas jest niepoprawny");
        timeToString = dateToCompare.toString();
        setEndTime(dateToCompare);
      } else {
        timeToString = changedTime.toString();
        setEndTime(changedTime);
      }
    }
    timeToSplit = timeToString.split(" ");
    let time = timeToSplit[4];
    let gmt = timeToSplit[5];
    timeToContext = time.concat(" ", gmt);

    setMattersTime(startOrEnd, timeToContext);
    setActiveMatter(activeMatter.id);
  };
  return activeMatter.id === 0 ? (
    <div></div>
  ) : (
    <div>
      <div
        className="handy-calendar-title"
        style={
          endDateSwitch === true
            ? { borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }
            : { borderRadius: "10px" }
        }
      >
        <h5>End Date</h5>
        <Switch
          name="endDateSwitch"
          checked={endDateSwitch}
          onChange={handleSwitchChange}
          color="secondary"
        />
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {endDateSwitch === true ? (
          <div>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              minDate={minDate}
              maxDate={maxDate}
              value={date}
              onChange={(newValue) => {
                handleDateChange(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <div>
              <div
                className="handy-calendar-time-title"
                style={
                  endTimeSwitch === true
                    ? {
                        borderRadius: "0px",
                      }
                    : {}
                }
              >
                <h5>End Time</h5>
                <Switch
                  disabled={activeMatter.startTime === null ? true : false}
                  name="endTimeSwitch"
                  checked={endTimeSwitch}
                  onChange={handleSwitchChange}
                  color="secondary"
                />
              </div>
              {endTimeSwitch === true ? (
                <div className="time-picker-div">
                  <TimePicker
                    orientation="desktop"
                    closeOnSelect={false}
                    value={endTime}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setEndTime(newValue);
                    }}
                    onClose={() => {
                      handleTimeChange(endTime);
                    }}
                    onAccept={() => {
                      handleTimeChange(endTime);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </LocalizationProvider>
    </div>
  );
}
