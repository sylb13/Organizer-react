import React, { useContext, useEffect, useState } from "react";
import { MattersContext } from "../../context/MattersContext";

export default function DayEvent(props) {
  const {
    categories,
    setActiveMatter,
    setActiveToDoList,
    activeMatter,
    hideOrShowDoneMatters,
  } = useContext(MattersContext);
  const [isActive, setIsActive] = useState(
    activeMatter.id === props.matterId ? true : false
  );

  const findOutColor = () => {
    let x = categories;
    let found = x.find((element) => element.id === props.categoryId);
    console.log("Found: " + found);
    if (found === undefined) {
      return "#d3d3d3";
    } else {
      return found.color;
    }
  };

  const handleClick = async () => {
    if (isActive === false) {
      await setActiveMatter(props.matterId);
      await setActiveToDoList(props.matterId);
    } else {
      await setActiveMatter(null);
      await setActiveToDoList(null);
    }
    setIsActive(!isActive); // nie daje tego na początku bo to i tak się zrobi wolniej niż reszta...
  };

  useEffect(() => {
    if (activeMatter.id === props.matterId) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeMatter]);

  return hideOrShowDoneMatters === true && props.isDone === true ? (
    <div hidden={true}></div>
  ) : (
    <div
      className="day-event"
      style={
        isActive
          ? { backgroundColor: "#9b72aa", border: "2px solid black" }
          : { backgroundColor: findOutColor() }
      }
      onClick={handleClick}
    >
      <div style={{ padding: "20px 10px" }}>
        <p
          style={{
            fontSize: 20,
            margin: "0px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "38ch",
          }}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
}
