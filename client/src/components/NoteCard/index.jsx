import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteCard({ id, topic, note, deleteNote }) {
    const handleDelete = () => {
        deleteNote(id);
    }

    return (
        <div>
            <h1>{topic}</h1>           
            <p><Link to={`/notes/${id}`} >{note}</Link></p>
            <button onClick={handleDelete}>Delete</button>
            <Link to="/notes">Back</Link>
        </div>
    )

}