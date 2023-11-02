import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

const apiURL = "https://time-table-server.onrender.com"
const siteURL = "https://time-table-app.onrender.com/"
const localURL = "http://localhost:5173/"
const localapi = "http://localhost:3003"

export default function NotePage() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    async function loadNote() {
      const res = await fetch(`${apiURL}/notes/${id}`);
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
