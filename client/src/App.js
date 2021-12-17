import logo from './logo.svg';
import Profile from './component/profile/profile';
import PokeModal from "./component/pokemodal/pokeModal";
import Modal from "react-bootstrap/esm/Modal";
import ForgetPassword from "./component/forgetPassword/ForgetPassword";
import SignIn from './component/signIn/signIn';
import TwoFactorModal from './component/signIn/twoFactorModal';
import HomePage from "./component/homepage/HomePage";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import { PersistGate } from 'redux-persist/integration/react'

//Redux
import { Provider } from "react-redux";
import { store } from "./store";
import { persistor } from "./store"
import { useEffect } from "react";
import { addPokeDescription, addPokemon } from "./redux/actions/pokemon";
import { CookiesProvider } from 'react-cookie';

const App = () => {
  useEffect(() => {
    store.dispatch(addPokemon());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/login' element={<SignIn />}></Route>
            <Route exact path='/homepage' element={<ProtectedRoute child={<HomePage />} />} />
            <Route exact path='/profile' element={<ProtectedRoute child={<Profile />} />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
