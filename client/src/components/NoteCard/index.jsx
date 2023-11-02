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
        <div>
            <h3><Link to={`${siteURL}notes/${id}`} >{note}</Link></h3>
            <h1>{topic}</h1>
            <p>{note}</p>

            <button onClick={handleDelete}>Delete</button>
            <Link to="/notes">Back</Link>
        </div>
    )

}