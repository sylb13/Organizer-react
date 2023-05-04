import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { MattersContext } from "../../context/MattersContext";
import { useEffect } from "react";

export default function AlertWindow() {
  const { activeMatter, activeAlert, setAlert, getAlert } =
    useContext(MattersContext);

  //   const [value, setValue] = useState(activeAlert);

  // useEffect(() => {
  //   getAlert();
  //   // setValue(activeAlert);
  //   console.log(activeAlert);
  // }, [activeAlert]);

  const handleChange = (newValue) => {
    // setValue(newValue);
    console.log(newValue);
  };

  const afterClose = (newValue) => {
    //  setValue(newValue);
    setAlert(newValue);
  };

  return activeMatter.id === 0 ? (
    <div></div>
  ) : (
    <div className="alert-window-div">
      <h5 className="cat-title" style={{ marginTop: "5px" }}>
        Alert
      </h5>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            //label="Alert date"
            value={activeAlert}
            onChange={(newValue) => {
              handleChange(newValue);
            }}
            onAccept={(newValue) => {
              afterClose(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
