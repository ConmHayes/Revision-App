

export default function EventForm({ tempData, setTempData }){
    console.log(tempData)
    return (
        <div className = "flexbox-container tall-form" style = {{height: "550px"}}>
            <div className="flexbox-header">
                {tempData}
            </div>
            
            <div className= "flex-options"><input type = "checkbox" />Revision</div>
            <div className="flexbox-form">Poop</div>
        </div>
    )
}