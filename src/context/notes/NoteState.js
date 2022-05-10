
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host= "http://localhost:5000";
    const notesInitisl=[ ]
      const [notes, setNotes] = useState(notesInitisl);
      // get all notes 
      const getallNotes=async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            "aurth-token":localStorage.getItem('token')
           
          },
        });
        const json=await response.json()
        console.log(json)
        setNotes(json);
      }
  // add a Note

     const addNote= async (title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          "aurth-token":localStorage.getItem('token')
         
        },
    
        body: JSON.stringify({title,description,tag}) 
      });
      const note = await response.json()
      setNotes(notes.concat(note))
     
    
     
     }
  //delete a Note
   const deleteNote=async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "aurth-token":localStorage.getItem('token')
       
      },
  
    });
    const json=await response.json()
    console.log(json)
     
     const newNotes= notes.filter((note)=>{return note._id!==id})
     setNotes(newNotes)

       
     }

  //edite a Note

  const editNote= async(id,title,description,tag)=>{
    //api call
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          "aurth-token":localStorage.getItem('token')
         
        },
    
        body: JSON.stringify({title,description,tag}) 
      });
      const json = await response.json()
      console.log(json);
    
    let newNotes= JSON.parse(JSON.stringify(notes))
    // method to edit notes
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id ===id) {
        newNotes[index].title= title;
        newNotes[index].description= description;
        newNotes[index].tag =tag
        break;
      }
      
    }
    setNotes(newNotes);
  }
  

  return (
    <noteContext.Provider value={{notes ,setNotes,addNote,deleteNote,getallNotes, editNote}}>
        {props.children}
        </noteContext.Provider>
  );
  };

export default NoteState;
 