import * as actions from "./types";
import axios from "axios";

export const addPokemon = () => async (dispatch) => {
  try {
    for (var i = 1; i <= 3; i++) {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + i);
      dispatch({
        type: actions.ADD_POKEMON,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

