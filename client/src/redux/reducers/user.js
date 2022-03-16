import { LOGIN, UPDATE_PROFILE_DATA, VALID_OTP, VERIFY_ACCOUNT, LIKE_POKE, FAVORITE_ITEM_CLICKED, FAVORITE_ITEM_CLICKED_CLEAR, GET_USER_COMMENTS, UPLOAD_PIC, GET_USER_DATA } from '../actions/types'
const initialState = {
  ID: '',
  UserName: '',
  FirstName: '',
  LastName: '',
  Email: '',
  ValidOtp: false,
  isVerified: false,
  FavouritePokemonClicked: 0,
  UserComments: [],
  FavouritePokemon: [],
  profilePic: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      }
    case VALID_OTP:
      return {
        ...state,
        ValidOtp: true
      }
    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        ...action.payload
      }
    case VERIFY_ACCOUNT:
      return {
        ...state,
        isVerified: true
      }
    case LIKE_POKE:
      let FavouritePokemon = [...state.FavouritePokemon];
      action.payload.pokeAction === "like"
        ? FavouritePokemon.push(action.payload.data.Data)
        : (FavouritePokemon = FavouritePokemon.filter(
          (item) => item != action.payload.data.Data
        ));
      return {
        ...state,
        FavouritePokemon,
      };
    case FAVORITE_ITEM_CLICKED:
      return {
        ...state,
        FavouritePokemonClicked: action.payload
      }
    case FAVORITE_ITEM_CLICKED_CLEAR:
      return {
        ...state,
        FavouritePokemonClicked: 0
      }
    case GET_USER_COMMENTS:
      return {
        ...state,
        UserComments: action.payload
      }
    case UPLOAD_PIC:
      return {
        ...state,
        profilePic: action.payload
      }
    case GET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
