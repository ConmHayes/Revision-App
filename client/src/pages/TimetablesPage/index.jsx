import { Calendar, TimetableGallery, EventForm } from "../../components";
import { useState, useEffect } from "react"

export default function TimetablesPage() {
  const [createEvent, setCreateEvent] = useState(false)
  const [tempData, setTempData] = useState("")



  return (<>
      <div className = "flexbox-container" style = {{ justifyContent: "center"}}>
        <div className="flex-item"></div>
        <div className = "flex-item">
        <Calendar createEvent = { createEvent } setCreateEvent = { setCreateEvent } tempData = { tempData } setTempData={setTempData}/>
        </div>
        <div className="flex-item" style = {{position: "relative", left: "75px"}}>{createEvent==true ? <EventForm tempData = {tempData} setTempData = {setTempData}/> : ""}</div>
      </div>;
    </>
)
}