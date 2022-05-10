import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate= useNavigate();
  const { notes, getallNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getallNotes();
    }
    else{
       navigate('/login');
    }
    // eslint-desable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentnote) => {
    ref.current.click();
    refClose.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
    
  };
  const handalClick = (e) => {

    editNote(
       note.id,
       note.etitle,
      note.edescription,
      note.etag,
    );
    refClose.current.click();
    props.showAlert("Note edited successfully","success")
   
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote  showAlert={props.showAlert}/>

      <button
        ref={ref}
        type="button"
        className="d-none btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    minLength={5}
                    required
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handalClick}
                disabled={note.etitle.length<3 ||note.edescription.length<5 }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-2">
        <h2>Your Note</h2>
        {notes.length===0 && <div className="container mx-2">No note to display</div> }
        {notes.map((notes) => {
          return (
            <NoteItem key={notes._id} updateNote={updateNote} notes={notes} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
