// individual note page like time table( time tables)
// add rute on app
import React, { useEffect, useState } from "react";
// import {}

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => { 
    async function getNotes() {
      const res = await fetch("http://localhost:3000/notes");
      const notes = await res.json();
      setNotes(notes);
    }
    getNotes();
  }, []);

  function displayNotes() {
    return notes.map((note) => {
      return (
        <div key={note.id}>
          <h1>{note}</h1>
          {/* <p>{note.description}</p> */}
          <button onClick={deleteNote}>Delete</button>
        </div>
      );
    });
  }

  async function deleteNote(id) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(`http://localhost:3000/notes/${id}`, options);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    
  } 


  
  return (
  <>


  <h1>Notes Page</h1>
  <div>{displayNotes()}</div>
  </>

  );
}

