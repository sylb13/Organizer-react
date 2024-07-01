import React, { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";

export default function EventDetails() {
  const { selectedEvent } = useContext(CalendarContext);

  return selectedEvent.id !== null ? (
    <div className="event-details">
      <h2>{selectedEvent.title}</h2>
      <h3>
        Starts at {selectedEvent.startDate}{" "}
        {selectedEvent.startTime ? selectedEvent.startTime.slice(0, 8) : null}
      </h3>
      <h3>
        Ends at {selectedEvent.endDate}{" "}
        {selectedEvent.endTime ? selectedEvent.endTime.slice(0, 8) : null}
      </h3>
      {selectedEvent.categoryId !== null ? (
        <h3>Belongs to {selectedEvent.category} category</h3>
      ) : (
        <h3>Doesn't belong to any category</h3>
      )}
      {selectedEvent.toDoListId !== null ? (
        <h3>Contain additional tasks</h3>
      ) : (
        <h3>Doesn't contain any additional tasks</h3>
      )}
    </div>
  ) : (
    <div className="event-details">
      <h4>Select an event to see some details...</h4>
      <h4>Click the day number to open the Day Screen...</h4>
    </div>
  );
}
