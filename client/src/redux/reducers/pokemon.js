import { ADD_POKEDESC, ADD_POKEMON } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POKEMON:
      return [...state, action.payload];
    default:
      return state;
  }
}
