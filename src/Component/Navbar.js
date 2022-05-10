import React from 'react'
import { Link , useNavigate, useLocation} from "react-router-dom";

const Navbar = () => {  
  let navigate= useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  let location = useLocation();
  React.useEffect(() => {
  }, [location]);
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNoteBook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <div className="navbar-nav">
          <Link className={`nav-link ${location.pathname==="/"? "active":""} `} aria-current="page" to="/">Home</Link>
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
        </div>
        </ul>
      {!localStorage.getItem('token') ? <form className="d-flex">
        <Link className="btn btn-sm btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-sm btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form>: <button className="btn btn-sm btn-primary mx-1" onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  </nav>
  </div>
  )
}

export default Navbar