import { Calendar, TimetableGallery, EventForm } from "../../components";
import { useState, useEffect } from "react"

export default function TimetablesPage() {
  const [createEvent, setCreateEvent] = useState(false)
  const [tempData, setTempData] = useState("")
  const [events, setEvents] = useState({
    note: "Revise Battle of Trafalgar",
    topic: "History",
    dateposted: tempData
  })
  const [timestamp, setTimestamp] = useState("")




  return (<>
      <div className = "flexbox-container" style = {{ justifyContent: "center"}}>
        <div className="flex-item">
          {createEvent == true ? "hello" : "Boo"}</div>
        <div className = "flex-item">
        <Calendar createEvent = { createEvent } 
                  setCreateEvent = { setCreateEvent } 
                  tempData = { tempData } 
                  setTempData={setTempData}
                  timestamp = {timestamp}
                  setTimestamp = {setTimestamp}/>
        </div>
        <div className="flex-item" style = {{position: "relative", left: "75px"}}>
          {createEvent==true ? <EventForm 
                                    tempData = {tempData} 
                                    setTempData = {setTempData}
                                    events = {events}
                                    setEvents = {setEvents}
                                    createEvent = {createEvent}
                                    setCreateEvent = {setCreateEvent}
                                    timestamp = {timestamp}
                                    setTimestamp = {setTimestamp}/> : ""}
        </div>
      </div>;
    </>
  );
}
