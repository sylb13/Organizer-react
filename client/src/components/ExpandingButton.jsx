import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

function ExpandingButton(props) {
  return (
    <button className="expanding-button" onClick={props.click}>
      {props.direction === "right" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
    </button>
  );
}

export default ExpandingButton;
