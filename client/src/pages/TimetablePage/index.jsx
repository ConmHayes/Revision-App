import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TimetableCard from "../../components/TimetableCard";

export default function TimetablePage() {
  const [timetable, setTimetable] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch(`http://localhost:5173/timetables/${id}`);
        const data = await response.json();
        console.log(data);
        setTimetable(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTimetable();
  }, [id]);

  return (
    <>
      <TimetableCard timetable={timetable} />
    </>
  );
}
