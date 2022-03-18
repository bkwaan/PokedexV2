import * as actions from "./types";
import axios from "axios";

export const addPokemon = () => async (dispatch) => {
  try {
    for (var i = 1; i <= 151; i++) {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + i);
      const res2 = await axios.get("https://pokeapi.co/api/v2/pokemon-species/" + i);
      let merged = {...res.data, ...res2.data};
      dispatch({
        type: actions.ADD_POKEMON,
        payload: merged,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

