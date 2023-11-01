import React from "react";

export default function TimetableImage({ timetable }) {
  return (
    <div className="timetable-image">
      <img src={timetable.imageUrl} alt={timetable.title} />
      <h3>{timetable.title}</h3>
      <p>{timetable.description}</p>
    </div>
  );
}
