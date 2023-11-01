import React from "react";

export default function TimetableCard({ timetable }) {
  return (
    <div className="timetable-card">
      <h2>{timetable.subject}</h2>
      <p>{timetable.description}</p>
      <p>Date: {timetable.date}</p>
    </div>
  );
}
