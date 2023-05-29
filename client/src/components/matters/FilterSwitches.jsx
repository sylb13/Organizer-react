import React, { useContext } from "react";
import { MattersContext } from "../../context/MattersContext";
import { Switch } from "@mui/material";

export default function FilterSwitches(props) {
  const {
    hideOrShowDoneMatters,
    setHideOrShowDoneMatters,
    hideOrShowExpiredMatters,
    setHideOrShowExpiredMatters,
  } = useContext(MattersContext);
  const [doneMattersTicked, setDoneMattersTicked] = React.useState(
    hideOrShowDoneMatters
  );
  const [expiredMattersTicked, setExpiredMattersTicked] = React.useState(
    hideOrShowExpiredMatters
  );

  const handleChange = (event) => {
    const { checked, name } = event.target;
    if (name === "doneMattersSwitch") {
      setHideOrShowDoneMatters(checked);
      setDoneMattersTicked(checked);
    } else {
      setHideOrShowExpiredMatters(checked);
      setExpiredMattersTicked(checked);
    }
  };

  return props.show === "done-only" ? (
    <div className="filter-switches-window" style={{ height: "85px" }}>
      <div className="filter-switch">
        <label>Done</label>
        <div>
          <label>Show</label>
          <Switch
            name="doneMattersSwitch"
            checked={doneMattersTicked}
            onChange={handleChange}
          />
          <label>Hide</label>
        </div>
      </div>{" "}
    </div>
  ) : (
    <div className="filter-switches-window">
      <div className="filter-switch">
        <label>Done</label>
        <div>
          <label>Show</label>
          <Switch
            name="doneMattersSwitch"
            checked={doneMattersTicked}
            onChange={handleChange}
          />
          <label>Hide</label>
        </div>
      </div>

      <div
        className="filter-switch"
        hidden={props.show === "done-only" ? true : false}
      >
        <label>Expired</label>
        <div>
          <label>Show</label>
          <Switch
            name="expiredMattersSwitch"
            checked={expiredMattersTicked}
            onChange={handleChange}
          />
          <label>Hide</label>
        </div>
      </div>
    </div>
  );
}
