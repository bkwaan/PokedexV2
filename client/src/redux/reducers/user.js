import { LOGIN, VALID_OTP} from '../actions/types'
const initialState ={
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
        default:
            return state;
    }
}
