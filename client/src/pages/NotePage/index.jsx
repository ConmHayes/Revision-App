import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";


export default function NotePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({});

  useEffect(() => { 
    async function loadNote() {
      const res = await fetch(`https://time-table-server.onrender.com/notes/${id}`);
      const note = await res.json();
      setNote(note);
      setLoading(false);
    }
    loadNote();
  }, [id]);
  function displayNote() {
    
      return (
      <div>
        <h1>{note.topic}</h1>
        <p>{note.note}</p>
        {/* <button onClick={deleteNote}>Delete</button> */}
        <Link to="/notes">Back</Link>
      </div>
      );  
    
  }


  return loading ? <h2><em>Loading...</em></h2> : displayNote();
 
}
