import { combineReducers } from "redux";
import pokemon from "./pokemon"
import comment from "./comment"

export default combineReducers({
    pokemon,
    comment
});
