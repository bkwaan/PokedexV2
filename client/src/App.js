import logo from './logo.svg';
import Profile from './component/profile/profile';
import PokeModal from "./component/pokemodal/pokeModal";
import Modal from "react-bootstrap/esm/Modal";
import ForgetPassword from "./component/forgetPassword/ForgetPassword";
import SignIn from './component/signIn/signIn';
import PokeList from './component/pokeList';
import Header from './component/header';
import HomePage from './component/homepage/HomePage';

function App() {
  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;
