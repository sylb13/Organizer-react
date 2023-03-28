import React, { useContext, useEffect } from "react";
import ToolsPanel from "../components/ToolsPanel";
import DetailsPanel from "../components/DetailsPanel";
import MainPanel from "../components/MainPanel";
import Calendar from "../components/calendar/Calendar";
import { CalendarContext } from "../context/CalendarContext";
import { MattersContext } from "../context/MattersContext";

function CalendarScreen() {
  const { getCalendarMatters, setChosenYear, setChosenMonth, setChosenDay } =
    useContext(CalendarContext);
  const { getCategories } = useContext(MattersContext);
  useEffect(() => {
    setChosenYear(year);
    setChosenMonth(month);
    getCategories();
  }, []);
  let date = new Date();
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

  const [year, setYear] = React.useState(date.getFullYear().toString());
  function handleYearChange(event) {
    setYear(event);
    setChosenYear(event);
    matterTablesForCalendar = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
  }

  const [month, setMonth] = React.useState(MONTHS[date.getMonth()]);
  function handleMonthChange(event) {
    setMonth(event);
    setChosenMonth(event);
    console.log(
      "To idzie do stejta: " + event + " a to idzie do kontekstu: " + month
    );
    matterTablesForCalendar = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
  }

  const [day, setDay] = React.useState(date.getDay() + 1);
  function handleSelectedDay(event) {
    setDay(event);
    setChosenDay(event);
    console.log(event);
  }

  let matterTablesForCalendar = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const [tabelka, ustawTabelke] = React.useState(matterTablesForCalendar);
  const mattersForCalendar = (x) => {
    //wielka szkoda że nie moge tutaj działać na calendarMatters... nie wiem właścieiwe po cholere mi ten context...
    //oczywiście problem taki jak zwykle... zanim się calendarMatters zdispatchuje do contextu to ta funkcja już chce się
    //wykonywać przez co wywala błąd że map() dostaje nulla... próbowałem to wrzucać już w rózne miejsca, async await, jakoś
    //to obchodzić ale nic nie pomaga, oczywiście rozwązaniem jest zapodanie do tej funkcj czystej res.data z zaptytania
    // do bazy.... PO CHOLERE JEST TEN KONTEKST...

    if (Array.isArray(x) === true && x.length !== 0) {
      x.map((matter) => mapFunction(matter));
      console.log(matterTablesForCalendar);
    } else {
      matterTablesForCalendar = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ];
      ustawTabelke(matterTablesForCalendar);
    }
  };
  const mapFunction = (matter) => {
    let startDay = parseInt(matter.startDate.substr(8, 2));
    let startMonth = matter.startDate.substr(4, 3);
    let endDay;
    let endMonth;
    if (matter.endDate !== null) {
      endDay = parseInt(matter.endDate.substr(8, 2));
      endMonth = matter.endDate.substr(4, 3);
    }
    let numberOfDaysTheEventTakes;
    // ta funkcja jest przygotowana pod wersję w której do bazy idzie zapytanie o wydarzenia
    // posiadające startDate LUB!!! endDate taką jak miesiąc obecnie wybrany
    // console.log(startMonth);
    // console.log(month);
    if (startMonth === month) {
      matterTablesForCalendar[startDay - 1].push({
        matter,
      });
      if (matter.endDate !== null) {
        // console.log("Tuturutuutuuuu");
        // console.log(monthOfEndDate);
        // console.log(month);
        if (endMonth === month) {
          numberOfDaysTheEventTakes = endDay - startDay; // bez +1 bo przecież w dniu rozpoczęcia już dodałem wydarzenie
          for (let i = 0; i < numberOfDaysTheEventTakes; i++) {
            matterTablesForCalendar[startDay + i].push({
              matter,
            });
          }
        } else {
          for (let i = startDay + 1; i <= 31; i++) {
            // +1 bo w dniu rozpoczecia już dodałem wydarzenie przed ifem
            matterTablesForCalendar[i - 1].push({
              matter,
            });
          }
        }
      }
    } else {
      // jeśli startMonth jest inny niż obecnie wybrany czyli wydarzenie kończy się w miesiącu obecnie wybranym
      numberOfDaysTheEventTakes = endDay;
      for (let i = 0; i < numberOfDaysTheEventTakes; i++) {
        matterTablesForCalendar[i].push({
          matter,
        });
      }
    }
    ustawTabelke([]);
    ustawTabelke(matterTablesForCalendar);
    // console.log(tabelka);
  };

  useEffect(() => {
    getCalendarMatters(month, year, mattersForCalendar);
  }, [month, year]);

  // const probna = () => {
  //   // getCalendarMatters();
  //   // console.log(calendarMatters);
  //   mattersForCalendar();
  // };

  return (
    <div className="grid-arrangement">
      <ToolsPanel
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        appearance="calendar"
      />
      <MainPanel />
      {/* <button
        style={{ width: "300px", height: "200px" }}
        onClick={() => {
          probna();
        }}
      ></button> */}

      <Calendar
        month={month}
        year={year}
        day={day}
        onDay={handleSelectedDay}
        events={tabelka}
      />

      <DetailsPanel appearance="calendar" />
    </div>
  );
}

export default CalendarScreen;
