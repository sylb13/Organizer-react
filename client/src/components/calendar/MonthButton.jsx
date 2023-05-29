import React from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

function MonthButton(props) {
  const [month, setMonth] = React.useState("");

  function handleMonthChange(event) {
    setMonth(event.target.value);
    props.onSubmit(event.target.value);
  }

  return (
    <div id="month-button">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={month}
          onChange={handleMonthChange}
          id="demo-simple-select"
          label="Month"
          sx={{ bgcolor: "#5970AA", width: 180 }}
        >
          <MenuItem value="Jan">January</MenuItem>
          <MenuItem value="Feb">February</MenuItem>
          <MenuItem value="Mar">March</MenuItem>
          <MenuItem value="Apr">April</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="Jun">June</MenuItem>
          <MenuItem value="Jul">July</MenuItem>
          <MenuItem value="Aug">August</MenuItem>
          <MenuItem value="Sep">September</MenuItem>
          <MenuItem value="Oct">October</MenuItem>
          <MenuItem value="Nov">November</MenuItem>
          <MenuItem value="Dec">December</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default MonthButton;
