import { LOGIN, UPDATE_PROFILE_DATA, VALID_OTP} from '../actions/types'
const initialState ={
    ID:'',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    ValidOtp: false,
    
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
        default:
            return state;
    }
}
