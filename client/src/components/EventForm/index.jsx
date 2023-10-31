

export default function EventForm({ tempData, setTempData }){
    console.log(tempData)
    return (
        <div className = "flexbox-container tall-form" style = {{height: "570px"}}>
            <div className="flexbox-header">
                {tempData}
            </div>
            <form id = "Note">
            <div className= "flex-options">
                <input type = "checkbox" style = {{position: "relative", right: "5px"}}/>Revision 
                <select style = {{  fontFamily: 'Courier New, Courier, monospace', position: "relative", left: "10px"}}>
                    <option className="select-option" value = "English">ENGLISH</option>
                    <option value = "Maths">MATHS</option>
                    <option value = "Languages">LANGUAGES</option>
                </select>
            </div> 
            <div className="flexbox-form"><textarea className="event-input" type = "text"></textarea></div>
            <div className="button-box">
                <button className = "form-button"><i className="material-icons" style = {{color: "#ff724b", position: "relative", }}>close</i>Cancel</button><button className="form-button">Create Event</button>
            </div>
            </form>
        </div>
    )
}