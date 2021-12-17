import { combineReducers } from "redux";
import pokemon from "./pokemon"
import user from "./user";

export default combineReducers({
    pokemon,
    user,
});