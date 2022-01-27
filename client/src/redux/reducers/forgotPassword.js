
import { CLEAR_FORGOT_PASSWORD, FORGOT_PASSWORD } from '../actions/types'

const initialState ={
    Success: false,
    Msg:''
    
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FORGOT_PASSWORD :
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_FORGOT_PASSWORD: 
            return initialState
        default:
            return state;
    }
}
