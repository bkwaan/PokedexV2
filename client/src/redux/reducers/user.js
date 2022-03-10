import { LOGIN, UPDATE_PROFILE_DATA, VALID_OTP, VERIFY_ACCOUNT, LIKE_POKE, FAVORITE_ITEM_CLICKED, FAVORITE_ITEM_CLICKED_CLEAR} from '../actions/types'
const initialState ={
    ID:'',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    ValidOtp: false,
    isVerified: false,
    FavouritePokemonClicked: 0
    
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.payload
            }
        case VALID_OTP:
            return{
                ...state,
                ValidOtp: true
            }
        case UPDATE_PROFILE_DATA:
            return{
                ...state,
                ...action.payload
            }
        case VERIFY_ACCOUNT:
          return{
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
            return{
              ...state,
              FavouritePokemonClicked: action.payload
            }
            case FAVORITE_ITEM_CLICKED_CLEAR:
              return{
                ...state,
                FavouritePokemonClicked: 0
              }
        default:
            return state;
    }
}
