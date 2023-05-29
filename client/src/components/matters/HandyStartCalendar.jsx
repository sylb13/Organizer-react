import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useContext, useEffect } from "react";
import { MattersContext } from "../../context/MattersContext";
import { TimePicker } from "@mui/x-date-pickers";
import { Switch } from "@mui/material";
import HandyEndCalendar from "./HandyEndCalendar";

export default function HandyStartCalendar() {
  const {
    activeMatter,
    setMattersDate,
    setMattersTime,
    setActiveMatter,
    currentGMT,
  } = useContext(MattersContext);
  useEffect(() => {
    setDate(() => {
      let mattersDate = new Date();
      console.log("Jestem przed ifem " + mattersDate);
      if (activeMatter.id !== 0) {
        if (activeMatter.startDate !== null) {
          if (activeMatter.startTime !== null) {
            mattersDate = activeMatter.startDate.concat(
              " ",
              activeMatter.startTime
            );
          } else {
            mattersDate = activeMatter.startDate.concat(
              " 00:00:00 " + currentGMT
            );
          }
        }
      }
      console.log("Jestem po ifie " + mattersDate);
      return mattersDate;
    });
    setStartTime(() => {
      let mattersTime = new Date();
      console.log("Jestem przed ifem " + mattersTime);
      if (activeMatter.id !== 0) {
        if (activeMatter.startDate !== null) {
          mattersTime = activeMatter.startDate.concat(
            " ",
            activeMatter.startTime
          );
        }
      }
      console.log("Jestem po ifie " + mattersTime);
      return mattersTime;
    });
    setStartDateSwitch(activeMatter.startDate !== null ? true : false);
    setStartTimeSwitch(activeMatter.startTime !== null ? true : false);
  }, [activeMatter]);
  const [date, setDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [startDateSwitch, setStartDateSwitch] = React.useState(false); //do zmiany, w zależności od tego co jest w bazie
  const [startTimeSwitch, setStartTimeSwitch] = React.useState(false);

  const minDate = new Date(2020, 0, 1, 0, 0, 0);
  const maxDate = new Date(2030, 11, 31, 23, 59, 59);

  const handleSwitchChange = (event) => {
    const { checked, name } = event.target;
    console.log(checked + " " + name);
    if (name === "startDateSwitch") {
      setStartDateSwitch(checked);
      if (checked === false) {
        setMattersDate("start", null);
        setMattersTime("start", null);
        setMattersDate("end", null); //dodane przy próbie poprawy działania
        setMattersTime("end", null); //dodane przy próbie poprawy działania
        setStartTimeSwitch(false);
        setActiveMatter(activeMatter.id);
        //tutaj powinno też wyłączać switcha z EndDate ale z tego komponentu nie mam dostępu   - dodane przy próbie poprawy działania
      } else {
        let currentDate = new Date(); //dodane przy próbie poprawy działania
        handleDateChange(currentDate); //dodane przy próbie poprawy działania
      }
    } else {
      if (checked === true) {
        setStartTime(null);
        setMattersTime("start", null);
        setStartTimeSwitch(checked);
      } else {
        setMattersTime("start", null);
        setStartTimeSwitch(checked);
        setActiveMatter(activeMatter.id);
      }
    }
  };

  const handleDateChange = (date) => {
    console.log("Chce zobaczyć co jak to wygląda: " + date);
    let dateToCompare;
    let startOrEnd = "start";
    let dateToString;
    if (activeMatter.endDate === null) {
      dateToString = date.toString();
      console.log(date);
    } else {
      if (activeMatter.endTime === null) {
        dateToCompare = new Date(
          Date.parse(activeMatter.endDate.concat(" 00:00:00 " + currentGMT))
        );
      } else {
        dateToCompare = new Date(
          Date.parse(activeMatter.endDate.concat(" ", activeMatter.endTime))
        );
      }

      if (date > dateToCompare) {
        setDate(dateToCompare);
        dateToString = dateToCompare.toString();
        alert("Podana data jest niepoprawna");
      } else {
        setDate(date);
        dateToString = date.toString();
      }
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
    console.log("Chce zobaczyć co jak to wygląda: " + dateToContext);
    setMattersDate(startOrEnd, dateToContext); // jakaś metoda z kontekstu
    setActiveMatter(activeMatter.id); //zablokowałem to bo powodowało podwójne triggerowanie głównego switcha
    // edit: odblokowałem to bo jest to niestety konieczne do odświeżenia w kontekście natychmiast zmiany daty czy czasu
    // dzięki czemu przy wielokrotnych zmianach w kalendarzu każda zmiana jest widoczna i nic sie nie crashuje
    // jedyną wadą jest to z jakiego powodu zablokowałem to wcześniej - przy pierwszym włączeniu switcha startDateSwitch
    // triggeruje sie on dwukronie przez co css go disabluje choć tak naprawdę jest enabled. Ale ponowne włączenie switcha
    // przez usera tak naprawdę nic złego nie robi
  };

  const handleTimeChange = (changedTime) => {
    let dateToCompare;
    let timeToString;
    const startOrEnd = "start";
    let timeToContext;
    let timeToSplit;
    if (activeMatter.endTime !== null) {
      dateToCompare = new Date(
        Date.parse(activeMatter.endDate.concat(" ", activeMatter.endTime))
      );
      console.log("Porównuję " + changedTime + " z " + dateToCompare);
      if (changedTime > dateToCompare) {
        setStartTime(dateToCompare);
        timeToString = dateToCompare.toString();
        alert("Podany czas jest niepoprawny");
      } else {
        setStartTime(changedTime);
        timeToString = changedTime.toString();
      }
    } else {
      timeToString = changedTime.toString();
      setStartTime(changedTime);
    }
    console.log(timeToString);
    timeToSplit = timeToString.split(" ");
    let time = timeToSplit[4];
    let gmt = timeToSplit[5];
    timeToContext = time.concat(" ", gmt);
    setMattersTime(startOrEnd, timeToContext); // jakaś metoda z kontekstu
    setActiveMatter(activeMatter.id);
  };
  return activeMatter.id === 0 ? (
    <div></div>
  ) : (
    <div>
      <div
        className="handy-calendar-title"
        style={
          startDateSwitch === true
            ? { borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }
            : { borderRadius: "10px" }
        }
      >
        <h5>Start Date</h5>
        <Switch
          name="startDateSwitch"
          checked={startDateSwitch}
          onChange={handleSwitchChange}
          color="secondary"
        />
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {startDateSwitch === true ? (
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
                  startTimeSwitch === true
                    ? {
                        borderRadius: "0px",
                      }
                    : {}
                }
              >
                <h5>Start Time</h5>
                <Switch
                  name="startTimeSwitch"
                  checked={startTimeSwitch}
                  onChange={handleSwitchChange}
                  color="secondary"
                />
              </div>
              {startTimeSwitch === true ? (
                <div className="time-picker-div">
                  <TimePicker
                    orientation="desktop"
                    closeOnSelect={false}
                    value={startTime}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setStartTime(newValue);
                    }}
                    onClose={() => {
                      handleTimeChange(startTime);
                    }}
                    onAccept={() => {
                      handleTimeChange(startTime);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              ) : (
                <div></div>
              )}
              <HandyEndCalendar />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </LocalizationProvider>
    </div>
  );
}
