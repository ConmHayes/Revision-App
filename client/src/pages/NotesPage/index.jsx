import React, { useEffect, useState } from "react";
import { NoteCard } from "../../components";

const apiURL = "https://time-table-server.onrender.com";
const siteURL = "https://time-table-app.onrender.com/";
const localURL = "http://localhost:5173/";
const localapi = "http://localhost:3003";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
        const options = {
          method: "GET",
          headers: {
            Authorization: localStorage.token
          }
        }
        const res = await fetch(`${apiURL}/notes`, options);
        if(res.ok) {
          const notesData = await res.json();
          setNotes(notesData)
        }else{
          setNotes([])
        }
    }
    getNotes();
  }, []);

  async function deleteNote(id) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token
      },
    };

    await fetch(`${apiURL}/notes/${id}`, options);
    const updatedNotes = notes.filter((note) => note.note_id !== id);

    setNotes(updatedNotes);
  }

  function displayNotes() {
    if (Array.isArray(notes)) {
      return (
       notes.map((note, i) => (
        <NoteCard 
        key={i} 
        id={note.note_id} 
        topic={note.topic} 
        note={note.note} 
        deleteNote={() => deleteNote(note.note_id)} />
       
      ))
      )

    } else {
      return <p>No notes available.</p>;
    }
  }

  return (
    <>
      <h1>Notes</h1>
      <div>{displayNotes()}</div>
    </>
  );
}