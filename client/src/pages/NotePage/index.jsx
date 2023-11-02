import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";



export default function NotePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({});

  useEffect(() => { 
    async function loadNote() {
      try {
      const res = await fetch(`https://time-table-server.onrender.com/notes/${id}`);
      const note = await res.json();
      setNote(note);
      setLoading(false);
      } catch (error) {
        console.error("Error loading notes", error)
        setLoading(false);
      }
    }
    loadNote();
  }, [id]);

  async function deleteNote() {
    try {
      const res = await fetch(`https://time-table-server.onrender.com/notes/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("Note deleted", data);
      window.location.assign("/notes");
     
    } catch (error) {
      console.error("Error deleting note", error);
    }
  }

  function displayNote() {
    
      return (
      <div>
        <h1>{note.topic}</h1>
        <p>{note.note}</p>
        <button onClick={deleteNote}>Delete</button>
        <Link to="/notes">Back</Link>
      </div>
      );  
    
  }


  return loading ? <h2><em>Loading...</em></h2> : displayNote();
 
}
