import { combineReducers } from "redux";
import pokemon from "./pokemon"
import comment from "./comment"
import user from "./user";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";

export default combineReducers({
    pokemon,
    comment,
    user,
    forgotPassword,
    resetPassword
});
