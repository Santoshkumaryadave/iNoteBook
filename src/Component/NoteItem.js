import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
  const { notes, updateNote } = props;
  return (
      
 
    <div className=" col-md-3 m-2">
      <div className="card" >
        <div className="card-body">
            <div className="d-flex align-items-center">
          <h5 className="card-title"> {notes.title}</h5>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)} } ></i>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(notes._id);props.showAlert("Note deleted successfully","success")}}></i>
          </div>
          <p className="card-text"> {notes.description}</p>
         
        </div>
      </div>
  
    </div>
  );
};

export default NoteItem;
