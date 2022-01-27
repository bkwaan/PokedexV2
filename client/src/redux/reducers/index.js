import { combineReducers } from "redux";
import pokemon from "./pokemon"
import user from "./user";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";

export default combineReducers({
    pokemon,
    user,
    forgotPassword,
    resetPassword
});