import React from "react";

export default function TimetableCard({ timetable }) {
  return (
    <div className="timetable-card">
      <h2>{timetable.title}</h2>
      <p>{timetable.description}</p>
      {/* Add other timetable information as needed */}
    </div>
  );
}
