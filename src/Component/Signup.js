import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential;

    const response = await fetch(`http://localhost:5000/api/aurth/creatuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the arthtoken and redirect
      localStorage.setItem("token", json.aurthtoken);
      navigate("/");
      props.showAlert("Signup successfully", "success");
    } else {
      props.showAlert("Invalid credential", "danger");
    }
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Signup for useing iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            className="form-control"
            id="Email1"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
            minLength={3}
            placeholder="Enter Your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="Email1"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            required
            minLength={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cPassword1">Conforme Password</label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="cpassword"
            onChange={onChange}
            placeholder="Conforme Password"
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
     
    </div>
  );
};

export default Signup;
