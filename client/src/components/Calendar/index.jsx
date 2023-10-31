import React from "react";
import { useEffect, useState } from "react";

export default function Calendar() {
  const [today, setToday] = useState("");

  function getToday() {
    const y = new Date().getFullYear();
    const m = new Date().getMonth() + 1;
    const d = new Date().getDate();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let suffix;
    if ((d == 1) | (d == 21) | (d == 31)) {
      suffix = "st";
    } else if ((d == 2) | (d == 22)) {
      suffix = "nd";
    } else if ((d == 3) | (d == 23)) {
      suffix = "rd";
    } else {
      suffix = "th";
    }

    const date = `${d}${suffix} ${months[m]} ${y}`;
    setToday(date);
  }

  useEffect(() => {
    getToday();
  }, []);

  return (
    <div className="container">
      <div className="calendar">
        <div className="front">
          <div className="current-date">
            <h1>{today}</h1>
          </div>
          <div className="current-month">
            <ul className="week-days">
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
              <li>Sun</li>
            </ul>

            <div className="weeks"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
