
import React, { useEffect, useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const res = await fetch(`https://time-table-server.onrender.com/notes`);
      if(res.ok) {
      const notes = await res.json();
      setNotes([notes])
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
      },
    };
    await fetch(`https://time-table-server.onrender.com/notes/${id}`, options);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  function displayNotes() {
    if (Array.isArray(notes)) {
      return notes.map((note) => (
        <div key={note.id}>
          <h1>{note.topic}</h1>
          <p>{note.note}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ));
    } else {
      return <p>No notes available.</p>;
    }
  }

  return (
    <>
      <h1>Notes Page</h1>
      <div>{displayNotes()}</div>
    </>
  );
}


// import React, { useEffect, useState } from "react";


// export default function NotesPage() {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => { 
//     async function getNotes() {
//       const res = await fetch(`https://time-table-server.onrender.com/notes`);
//       const notes = await res.json();
//       setNotes(notes);
//     }
//     getNotes();
//   }, []);

//   function displayNotes() {
//     return notes.map((note) => {
//       return (
//         <div key={note.id}>
//           <h1>{note.topic}</h1>
//           <p>{note.note}</p>          
//           <button onClick={deleteNote}>Delete</button>
//         </div>
//       );
//     });
//   }

//   async function deleteNote(id) {
//     const options = {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     await fetch(`https://time-table-server.onrender.com/notes/${id}`, options);
//     const updatedNotes = notes.filter((note) => note.id !== id);
//     setNotes(updatedNotes);
    
//   } 


  
//   return (
//   <>


//   <h1>Notes Page</h1>
//   <div>{displayNotes()}</div>
//   </>

//   );
// }

