import React, { useContext, useEffect } from "react";
import { Checkbox } from "@mui/material";
import { MattersContext } from "../../context/MattersContext";

export default function StatusCheckbox() {
  const { activeMatter, setActiveMatter, markMatterAsDone } =
    useContext(MattersContext);
  const [ticked, setTicked] = React.useState(activeMatter.isDone);

  useEffect(() => {
    setTicked(activeMatter.isDone);
  }, [activeMatter.id]);

  const handleChange = async (event) => {
    let done = event.target.checked;
    console.log(done);
    setTicked(done);
    console.log(ticked);
    markMatterAsDone(done, activeMatter.id);
    setActiveMatter(activeMatter.id);
  };

  return activeMatter.id === 0 ? (
    <div></div>
  ) : (
    <div className="status-checkbox-div">
      <h5>Is done?</h5>
      <Checkbox
        checked={ticked ? true : false}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        color="secondary"
      />
    </div>
  );
}
