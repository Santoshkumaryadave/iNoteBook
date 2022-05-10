
import Notes from "./Notes";

const Home = (props) => {
  const {showAlert}= props
  return (
    <div className="Container my-3">
      <Notes  showAlert={showAlert}/>
  
    </div>
  );
};

export default Home;
