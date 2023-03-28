import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

export default function ChangeDayButton(props) {
  const styleForRight = {
    marginLeft: "25px",
  };
  const styleForLeft = {
    marginRight: "25px",
  };

  return (
    <button
      className="change-day-button"
      style={props.direction === "right" ? styleForRight : styleForLeft}
      onClick={props.changeDay}
    >
      {props.direction === "right" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
    </button>
  );
}
