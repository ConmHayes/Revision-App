import React from "react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar"


export default function schedule( {createEvent, setCreateEvent, tempData, setTempData}) {
  const [today, setToday] = useState("");
  const [date, setDate] = useState(new Date())
  
  function dateReturn(d, m, y){
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
    return date
  }

  function getToday() {
    const y = new Date().getFullYear();
    const m = new Date().getMonth();
    const d = new Date().getDate();
    
    setToday(dateReturn(d, m, y));
  }
  function logi(date){
    const d = date.getDate()
    const m = date.getMonth()
    const y = date.getFullYear()
    const selectedDate = dateReturn(d, m, y)
    const data = {
      dateString: selectedDate,
    }
    console.log(selectedDate)
    setCreateEvent(true)
    setTempData(selectedDate)

  }
  useEffect(() => {
    getToday();
  }, []);


  return (
    <div className = "app">
      <h1 className = "text-center">Your Calendar</h1>
      <div className = "calendar-container">
        <Calendar onChange = { setDate } value = { date } onClickDay={logi}/>
      </div>
      <p className = "text-center">
        <span className = "bold"> { today }</span>
      </p>
    </div>
    
  );
}


/*
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
*/