import React, { useEffect, useState } from "react"
import { dateFnsLocalizer } from "react-big-calendar"
import { Link } from "react-router-dom"

const apiURL = "https://time-table-server.onrender.com"
const siteURL = "https://time-table-app.onrender.com/"
const localURL = "http://localhost:5173/"
const localapi = "http://localhost:3003"


export default function NotesByDate( { tempData, setTempData, events, setEvents, createEvent, setCreateEvent, timestamp, setTimestamp  } ){
    const [subjectFilter, setSubjectFilter] = useState("All")
    const [notesDated, setNotesDated] = useState([{
        note_id: 1,
        note: "Help",
        topic: "ENGLISH",
        dateposted: "2023-11-18 00:00:00"
    }])
    const [dataLength, setDataLength] = useState(1)

    function subjectChange(){
        setSubject(document.getElementById("Subject-Select").value)
    }

    function handleCancel(){
        setCreateEvent(false)
    }

    async function getByDate(){


        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.token,

            },
            body: JSON.stringify({
                dateposted: timestamp
            })
        }
        const response = await fetch(`${apiURL}/notes/dates`, options)
        const data = await response.json()
        if (data.length === undefined){
            setDataLength(1)
        } else{
            setDataLength(data.length)
        }
        setNotesDated(data)
        if (response.status == 200){
            
        } else {
            alert(data.error)
        }


    }
    const subjects = ["All", "ENGLISH", "MATHS", "SCIENCE", "LANGUAGES", "HISTORY", "GEOGRAPHY", "MUSIC", "ART", "TECHNOLOGY", "COMPUTING", "OTHER"]
    useEffect(() => {
        getByDate()
    }, [tempData])

    function renderList(){
        if (dataLength == 1){
            if (notesDated.note == "No notes for that date yet"){
                return <li className="listed-note">TOPIC: {notesDated.topic} <br></br> NOTE: {notesDated.note}</li>    
            }
        }else{
        return notesDated.map((note, i) => (
            <Link to = {`${siteURL}notes/${note.note_id}`} key = {i}><li className="listed-note">
                TOPIC: {note.topic}<br></br>NOTE: {note.note}
            </li></Link>))

        }
    }
   

    function multipleReturn(){
        return <li key = {notesDated.note_id}>TOPIC: {notesDated.topic}<br></br>NOTE: {notesDated.note}</li>

    }

    return (
        <div className = "flexbox-container tall-form" style = {{height: "570px"}}>
            <div className="flexbox-header-left">
                NOTES FOR: {tempData}
            </div>
            <form id = "Notes">
            <div className= "flex-options">
            FILTER:<select id="Subject-Select" onChange={subjectChange} style = {{  fontFamily: 'Courier New, Courier, monospace', position: "relative", left: "10px"}}>
                    {subjects.map((s, i) =>
                        <option className = "select-option" key = {i} value = {s}>{s}</option>
                    )}
                </select>
            </div> 
            <div className="flexbox-form-list"><ul className="date-note-list">{renderList()}</ul></div>
            </form>
        </div>
    )
}