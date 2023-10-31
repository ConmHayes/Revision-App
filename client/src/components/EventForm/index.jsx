

export default function EventForm({ tempData, setTempData, events, setEvents, createEvent, setCreateEvent }){
    function handleCancel(){

        setCreateEvent(false)
    }

    function handleCreate(e){
        e.preventDefault()
        setCreateEvent(false)
    }
    const subjects = ["ENGLISH", "MATHS", "SCIENCE", "LANGUAGES", "HISTORY", "GEOGRAPHY", "MUSIC", "ART", "TECHNOLOGY", "COMPUTING", "OTHER"]

    function options(subjects){
        const opines = subjects.map((s, idx) => <option className = "select-option" key = {idx} value = {s}>{s}</option>)

        return opines
    }


    return (
        <div className = "flexbox-container tall-form" style = {{height: "570px"}}>
            <div className="flexbox-header">
                {tempData}
            </div>
            <form id = "Note">
            <div className= "flex-options">
                <input type = "checkbox" style = {{position: "relative", right: "5px"}}/>Revision 
                <select style = {{  fontFamily: 'Courier New, Courier, monospace', position: "relative", left: "10px"}}>
                    {subjects.map((s, i) =>
                        <option className = "select-option" key = {i}>{s}</option>
                    )}
                    
                    
                </select>
            </div> 
            <div className="flexbox-form"><textarea className="event-input" type = "text"></textarea></div>
            <div className="button-box">
                <button className = "form-button" type = "click" onClick={handleCancel}><i className="material-icons" style = {{color: "#ff724b", position: "relative", top: "5px"}}>close</i>Cancel</button>
                <button className = "form-button" type = "submit" onSubmit={handleCreate}><i className="material-icons" style = {{color: "#ff724b", position: "relative", top: "5px"}}>done</i>Create Event</button>
            </div>
            </form>
        </div>
    )
}

/*<option className="select-option" value = "English">ENGLISH</option>
                    <option value = "Maths">MATHS</option>
                    <option value = "Languages">LANGUAGES</option>*/