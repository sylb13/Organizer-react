import React, { useContext } from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { MattersContext } from "../../context/MattersContext";

function SortMattersButton(props) {
  const { sort, setSortType } = useContext(MattersContext);

  //   const [typeOfSort, setTypeOfSort] = React.useState("");

  function handleSortChange(event) {
    const sortType = event.target.value;
    console.log(event.target.value);
    console.log(sortType);
    setSortType(sortType);
    // getMatters(sortType);
    // props.onSubmit(event.target.value);
  }

  return (
    <div id="sort-matter-button">
      <FormControl sx={{ marginLeft: 20 }}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={sort}
          onChange={handleSortChange}
          id="demo-simple-select"
          label="Sort"
          sx={{ bgcolor: "#5970AA", m: 1, width: 200 }}
        >
          <MenuItem value="newest">listing time: newest</MenuItem>
          <MenuItem value="oldest">listing time: oldest</MenuItem>
          <MenuItem value="soonest">beginning: soonest</MenuItem>
          <MenuItem value="latest">beginning: latest</MenuItem>
          <MenuItem value="a-z">A - Z</MenuItem>
          <MenuItem value="z-a">Z - A</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SortMattersButton;
