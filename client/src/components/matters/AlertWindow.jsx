import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { MattersContext } from "../../context/MattersContext";
import { useEffect } from "react";

export default function AlertWindow() {
  const {
    activeMatter,
    activeAlert,
    setAlert,
    getAlertList,
    alertsList,
    getAlert,
    alertsIds,
    updateAlertsIds,
  } = useContext(MattersContext);

  const [value, setValue] = useState(activeAlert);

  const dateEngine = new Date();

  useEffect(() => {
    getAlertList();
    setValue(activeAlert);
  }, [activeAlert]);

  useEffect(() => {
    getAlert();
    setValue(activeAlert);
  }, [activeMatter]);

  useEffect(() => {
    if (alertsList !== null && alertsList !== undefined) {
      alertsIds.forEach((alertId) => clearTimeout(alertId));
      alertsList.map((alert) => createAlerts(alert));
    }
  }, [alertsList]);

  const createAlerts = (x) => {
    console.log("Wchodzę w createAlerts");
    let alertDate = new Date(x.date);
    let alertDateUTC = alertDate.toUTCString();
    let alertDateUTCDate = new Date(alertDateUTC);
    let alertDateMiliseconds = alertDateUTCDate.getTime();
    console.log(alertDateMiliseconds);
    let currentDate = dateEngine.getTime();
    console.log(currentDate);
    // console.log(alertDateMiliseconds - currentDate);
    if (alertDateMiliseconds - currentDate > 0) {
      console.log("Zaraz stwrzę alert");
      const timeoutId = setTimeout(() => {
        alert('Alert związany z wydarzeniem "' + x.Matter.title + '"');
      }, alertDateMiliseconds - currentDate);
      console.log(timeoutId);
      updateAlertsIds(timeoutId);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const afterClose = (newValue) => {
    setValue(newValue);
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
            value={value}
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
