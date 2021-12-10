import logo from './logo.svg';
import Profile from './component/profile/profile';
import PokeModal from "./component/pokemodal/pokeModal";
import Modal from "react-bootstrap/esm/Modal";
import ForgetPassword from "./component/forgetPassword/ForgetPassword";
import SignIn from './component/signIn/signIn';
import TwoFactorModal from './component/signIn/twoFactorModal';
import HomePage from "./component/homepage/HomePage";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import { addPokemon } from "./redux/actions/pokemon";

const App = () => {
  useEffect(() => {
    store.dispatch(addPokemon());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
};

export default App;
