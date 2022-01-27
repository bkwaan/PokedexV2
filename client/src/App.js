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
import ResetPassword from './component/forgetPassword/ResetPassword';

//Redux
import { Provider } from "react-redux";
import { store } from "./store";
import { persistor } from "./store"
import { useEffect } from "react";
import { addPokeDescription, addPokemon } from "./redux/actions/pokemon";


const App = () => {
  useEffect(() => {
    store.dispatch(addPokemon());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<SignIn />}></Route>
            <Route exact path='/homepage' element={<ProtectedRoute child={<HomePage />} />} />
            <Route exact path='/profile' element={<ProtectedRoute child={<Profile />} />} />
            <Route exact path='/ResetPassword/:Token' element={<ResetPassword/>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
