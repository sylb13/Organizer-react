import React from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

function YearButton(props) {
  const [year, setYear] = React.useState("");

  function handleYearChange(event) {
    setYear(event.target.value);
    props.onSubmit(event.target.value);
  }

  return (
    <div id="year-button">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={year}
          onChange={handleYearChange}
          id="demo-simple-select"
          label="Year"
          sx={{ bgcolor: "#5970AA", width: 180 }}
        >
          <MenuItem value="2021">2021</MenuItem>
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2024">2024</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default YearButton;
