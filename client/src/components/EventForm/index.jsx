import { useState, useEffect } from "react"

const apiURL = "https://time-table-server.onrender.com"
const siteURL = "https://time-table-app.onrender.com/"
const localURL = "http://localhost:5173/"
const localapi = "http://localhost:3003"

export default function EventForm({ tempData, setTempData, events, setEvents, createEvent, setCreateEvent, timestamp, setTimestamp }){
    const [subject, setSubject] = useState("ENGLISH")
    const [noteText, setNoteText] = useState("")

    function subjectChange(){
        setSubject(document.getElementById("Subject-Select").value)
    }

    function updateNote(){
        setNoteText(document.getElementById("NewNote").value)
    }

    function handleCancel(){

        setCreateEvent(false)
    }

    async function handleCreate(e){
        e.preventDefault()


        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: localStorage.token,

            },
            body: JSON.stringify({
                note: noteText,
                topic: subject,
                dateposted: timestamp
            })
        }
        const response = await fetch(`${apiURL}/notes`, options)
        const data = await response.json()

        if (response.status == 200){
            alert("Note added!")
        } else {
            alert(data.error)
        }

        setCreateEvent(false)

    }
    const subjects = ["ENGLISH", "MATHS", "SCIENCE", "LANGUAGES", "HISTORY", "GEOGRAPHY", "MUSIC", "ART", "TECHNOLOGY", "COMPUTING", "OTHER"]

    return (
        <div className = "flexbox-container tall-form" style = {{height: "570px"}}>
            <div className="flexbox-header">
                CREATE NOTE: {tempData}
            </div>
            <form id = "Note" onSubmit={handleCreate}>
            <div className= "flex-options">
            SUBJECT:<select id="Subject-Select" onChange={subjectChange} style = {{  fontFamily: 'Courier New, Courier, monospace', position: "relative", left: "10px"}}>
                    {subjects.map((s, i) =>
                        <option className = "select-option" key = {i} value = {s}>{s}</option>
                    )}
                    
                    
                </select>
            </div> 
            <div className="flexbox-form"><textarea id = "NewNote" className="event-input" type = "text" onChange={updateNote}></textarea></div>
            <div className="button-box">
                <button className = "form-button" type = "click" onClick={handleCancel}><i className="material-icons" style = {{color: "#ff724b", position: "relative", top: "5px"}}>close</i>Cancel</button>
                <button className = "form-button" type = "submit" ><i className="material-icons" style = {{color: "#ff724b", position: "relative", top: "5px"}}>done</i>Create Event</button>
            </div>
            </form>
        </div>
    )
}

/*<option className="select-option" value = "English">ENGLISH</option>
                    <option value = "Maths">MATHS</option>
                    <option value = "Languages">LANGUAGES</option>*/