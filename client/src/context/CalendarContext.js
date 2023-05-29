import React, { useReducer } from "react";
import axios from "axios";
import { createContext } from "react";

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
const date = new Date();

const initialState = {
  calendarMatters: null,
  chosenMonth: MONTHS[date.getMonth()],
  chosenYear: date.getFullYear().toString(),
  chosenDay: date.getDay() + 1,
  selectedEvent: { id: null },
  currentGMT: date.toString().slice(25, 33),
};

const CalendarReducer = (state, action) => {
  switch (action.type) {
    case "GET_CALENDAR_MATTERS":
      return {
        ...state,
        calendarMatters: action.payload,
      };

    case "SET_CHOSEN_MONTH":
      return {
        ...state,
        chosenMonth: action.payload,
      };

    case "SET_CHOSEN_YEAR":
      return {
        ...state,
        chosenYear: action.payload,
      };

    case "SET_CHOSEN_DAY":
      return {
        ...state,
        chosenDay: action.payload,
      };

    case "SELECT_EVENT":
      return {
        ...state,
        selectedEvent: action.payload,
      };

    default:
      return { ...state };
  }
};

const CalendarContext = createContext(initialState);

const CalendarProvider = (props) => {
  const [state, dispatch] = useReducer(CalendarReducer, initialState);

  const getCalendarMatters = (month, year, prepareToDisplayFunction) => {
    axios
      .get(`http://localhost:3000/get-calendar-matters${month}-${year}`)
      .then((res) => {
        dispatch({
          type: "GET_CALENDAR_MATTERS",
          payload: res.data,
        });
        console.log(res.data);
        prepareToDisplayFunction(res.data);
      });
  };

  const setChosenMonth = (month) => {
    dispatch({
      type: "SET_CHOSEN_MONTH",
      payload: month,
    });
    // getCalendarMatters(month, state.chosenYear);
  };

  const setChosenYear = (year) => {
    dispatch({
      type: "SET_CHOSEN_YEAR",
      payload: year,
    });
    //  getCalendarMatters(state.chosenMonth, year);
  };

  const setChosenDay = (day) => {
    dispatch({
      type: "SET_CHOSEN_DAY",
      payload: day,
    });
  };

  const selectEvent = (event) => {
    dispatch({
      type: "SELECT_EVENT",
      payload: event,
    });
  };

  const goToDayScreen = () => {
    console.log("Jestem w goToDayScreen");
    axios.get(`http://localhost:3000/get-day-screen`);
    // .then(render("/day-screen"));
  };

  return (
    <CalendarContext.Provider
      value={{
        calendarMatters: state.calendarMatters,
        chosenMonth: state.chosenMonth,
        chosenYear: state.chosenYear,
        chosenDay: state.chosenDay,
        selectedEvent: state.selectedEvent,
        currentGMT: state.currentGMT,
        getCalendarMatters,
        setChosenMonth,
        setChosenYear,
        setChosenDay,
        selectEvent,
        goToDayScreen,
      }}
      {...props}
    />
  );
};

export { CalendarContext, CalendarProvider };
