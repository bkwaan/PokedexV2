import logo from "./logo.svg";
import PokeModal from "./component/pokemodal/PokeModal";
import Modal from "react-bootstrap/esm/Modal";
import ForgetPassword from "./component/forgetPassword/ForgetPassword";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
      <ForgetPassword/>
    </div>
  );
}

export default App;
