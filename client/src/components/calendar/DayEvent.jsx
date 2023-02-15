import React from "react";

export default function DayEvent() {
  return (
    <div className="day-event">
      <div style={{ width: "100px" }}>
        <p
          style={{
            fontSize: 10,
            margin: "0px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        ></p>
      </div>
    </div>
  );
}
