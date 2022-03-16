import { combineReducers } from "redux";
import pokemon from "./pokemon"
import comment from "./comment"
import user from "./user";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'pokemon', 'comment', 'forgotPassword', 'resetPassword'],
}

const userConfig = {
    key: 'user',
    storage,
    blacklist: ['UserComments', 'FavouritePokemon', 'profilePic'],
    debug: true
 };


const rootReducer = combineReducers({
    pokemon,
    comment,
    user: persistReducer(userConfig, user),
    forgotPassword,
    resetPassword
});


export default persistReducer(persistConfig,rootReducer)
