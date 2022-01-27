import { RESET_PASSWORD, VALID_RESET_TOKEN } from "../actions/types"

const initialState ={
    Success: false,
    Msg:''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESET_PASSWORD :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
