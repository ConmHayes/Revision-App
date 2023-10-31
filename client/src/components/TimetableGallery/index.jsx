// 1. retrieve the timetables from API by fetch request
// 2. store the timetables in a state
// 3. map through the timetables and render a card/div for each timetable

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TimetableImage from "../TimetableImage";

export default function TimetableGallery() {
  let url = "";
  const [timetables, setTimetables] = useState([]);
  useEffect(() => {
    async function displayTimetables() {
      try {
        const response = await fetch(
          "https://time-table-app.onrender.com/timetables"
        );
        const data = await response.json();
        console.log(data);
        setTimetables(data);
      } catch (err) {
        console.log(err);
      }
    }
    displayTimetables();
  }, []);
  return (
    <div className="timetables">
      {timetables.map((timetable) => (
        <Link to={`/timetables/${timetable.id}`} key={timetable.id}>
          <TimetableImage timetable={timetable} />
        </Link>
      ))}
    </div>
  );
}
