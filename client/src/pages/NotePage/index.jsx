import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";


export default function notePage() {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    async function loadNote() {
      const res = await fetch(`http://localhost:3000/notes/${id}`);
      const note = await res.json();
      setNote(note);
      setLoading(false);
    }
    loadNote();
  }, [id]);
  function displayNote() {
    
      return (
      <div>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        {/* <button onClick={deleteNote}>Delete</button> */}
        <Link to="/notes">Back</Link>
      </div>
      );  
    
  }


  return loading ? <h2><em>Loading...</em></h2> : displayNote();
 
}
