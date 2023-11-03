import React from 'react';
import { Link } from 'react-router-dom';

const apiURL = "https://time-table-server.onrender.com"
const siteURL = "https://time-table-app.onrender.com/"
const localURL = "http://localhost:5173/"
const localapi = "http://localhost:3003"



export default function NoteCard({ id, topic, note, deleteNote }) {
    const handleDelete = () => {
        deleteNote(id);
    }

    return (
        <div className='note-box'>
            <h3><Link to={`${localURL}notes/${id}`} className='link'>{note}</Link></h3>

            <h1>TOPIC: {topic}</h1>
            <div className='flexbox-container' style= {{height: "20px"}}><button onClick={handleDelete} className="deleteButton">Delete</button>
            {document.body.classList.contains("notes-page") ? <p></p> : <Link to="/notes" className='inline-link'><button className='loginButton'>Back</button></Link>}
</div>
        </div>
    )

}