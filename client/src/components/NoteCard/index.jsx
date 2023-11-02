import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteCard({ id, topic, note, deleteNote }) {
    const handleDelete = () => {
        deleteNote(id);
    }

    return (
        <div>
            <h3><Link to={`/notes/${id}`} >{note}</Link></h3>
            <h1>{topic}</h1>
            <p>{note}</p>
            <button onClick={handleDelete}>Delete</button>
            <Link to="/notes">Back</Link>
        </div>
    )

}