import React, {useState, useEffect} from "react";
import { Link, useParams} from "react-router-dom";


const apiURL = "https://time-table-server.onrender.com"
const siteURL = "https://time-table-app.onrender.com/"
const localURL = "http://localhost:5173/"
const localapi = "http://localhost:3003"

export default function NotePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({});

  useEffect(() => { 
    async function loadNote() {
      try {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.token

        }
      }
      console.log(options)
      const res = await fetch(`${localapi}/notes/${id}`, options);
      console.log(res)
      const note = await res.json();
      
      console.log(note)
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
      const res = await fetch(`${localapi}}/notes/${id}`, {
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
    
      return (<div className="flexbox-container" style = {{justifyContent: "center", alignItems: "center"}}>
      <div className="note-box flexbox-container-notes">
          <h1>{note.topic}</h1>
          <p>{note.note}</p>
          <button onClick={deleteNote} className="deleteButton">Delete</button>
          <Link to="/notes"><button className = "deleteButton">Back</button></Link>
      </div>
      </div>
      );  
    
  }


  return loading ? <h2><em>Loading...</em></h2> : displayNote();
 
}
