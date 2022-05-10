import React,{useState} from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Component/About";
import Alert from "./Component/Alert";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Navbar from "./Component/Navbar";
import Signup from "./Component/Signup";
import NoteState from "./context/notes/NoteState";


const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (massage, type) => {
    setAlert({
      msg: massage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <NoteState>
       <Navbar />
       <Alert alert={alert}/>
      <div className=" container App">
       
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/signup" element={< Signup showAlert={showAlert}/>} />
        </Routes>
      </div>
    </NoteState>
  );
};

export default App;
