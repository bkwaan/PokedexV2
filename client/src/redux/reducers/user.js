import {
  LOGIN,
  UPDATE_PROFILE_DATA,
  VALID_OTP,
  LIKE_POKE,
} from "../actions/types";
const initialState = {
  ID: "",
  UserName: "",
  FirstName: "",
  LastName: "",
  Email: "",
  FavouritePokemon: [],
  ValidOtp: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case VALID_OTP:
      return {
        ...state,
        ValidOtp: true,
      };
    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case LIKE_POKE:
      let FavouritePokemon = [...state.FavouritePokemon];
      console.log(action.payload.data);
      action.payload.pokeAction === "like"
        ? FavouritePokemon.push(action.payload.data.Data)
        : (FavouritePokemon = FavouritePokemon.filter(
            (item) => item != action.payload.data.Data
          ));
      return {
        ...state,
        FavouritePokemon,
      };
    default:
      return state;
  }
}
