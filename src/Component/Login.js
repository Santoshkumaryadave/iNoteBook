import React ,{useState }from "react";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credential, setCredential] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handleSubmit=async (e)=>{
          e.preventDefault();
          const  { email, password }=credential
            const response = await fetch(`http://localhost:5000/api/aurth/login`, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json',
               
               
              },
              body: JSON.stringify({email,password,})
            });
            const json= await response.json()
            console.log(json)
            if(json.success){
                //save the arthtoken and redirect
                localStorage.setItem('token',json.aurthtoken);
                navigate('/');
                props.showAlert("Login successfully","success")

            }
            else{
              props.showAlert("Invalid credential","danger")
            }
        
    }
    const onChange = (e) => {
       setCredential({ ...credential, [e.target.name]: e.target.value });
      };
  return (
    <div className="container my-3">
      <h2>Login for Continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            value={credential.email}
          />
        </div>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            value={credential.password}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2 " >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
