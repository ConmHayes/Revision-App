import React, { useEffect, useState } from "react"


export default function NotesByDate( { tempData, setTempData, events, setEvents, createEvent, setCreateEvent, timestamp, setTimestamp  } ){
    const [subjectFilter, setSubjectFilter] = useState("All")
    const [notesDated, setNotesDated] = useState([{
        note_id: 1,
        note: "Help",
        topic: "ENGLISH",
        dateposted: "2023-11-18 00:00:00"
    }])
    function subjectChange(){
        setSubject(document.getElementById("Subject-Select").value)
    }

    function handleCancel(){
        setCreateEvent(false)
    }

    async function getByDate(){
        console.log(tempData)


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
        const response = await fetch("https://time-table-server.onrender.com/notes/dates", options)
        const data = await response.json()
        console.log(data)
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
            <div className="flexbox-form-list"></div>
            </form>
        </div>
    )
}

/*
<ul>{notesDated.map((note, i) => {
                                                                    <li key = {i}>TOPIC: {note.topic}<br></br>Note: {note.note}</li>
            })}</ul>
*/