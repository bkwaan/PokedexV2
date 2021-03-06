import SignIn from './component/signIn/signIn';
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
import { addPokemon } from "./redux/actions/pokemon";
import ProfilePage from './component/profile/profilePages/profilePage';
import VerifyAccount from './component/verifyAccount/VerifyAccount';


const App = () => {
  useEffect(() => {
    store.dispatch(addPokemon());
    // store.dispatch(getComment(1));
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/login' element={<SignIn />}></Route>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/profile' element={<ProtectedRoute child={<ProfilePage />} />} />
            <Route exact path='/ResetPassword/:Token' element={<ResetPassword/>}/>
            <Route exact path='/VerifyAccount/:UserName/:Token' element={<VerifyAccount/>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
