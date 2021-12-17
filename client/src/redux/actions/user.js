import axios from "axios";
import { LOGIN, LOGOUT } from '../actions/types'

// Actions
export const loginUser = (data) => {
    return {
        type: LOGIN,
        payload: data,
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const signUp = () => {

}

// Thunks
//Adds user to state after they login and validate their otp
export const loginUserAsync = (userName, token) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/api/User/VerifyOTP', { UserName: userName, Token: token})
        console.log(res.data.clientInfo)
        return dispatch(loginUser(res.data.clientInfo))
    } catch (e) {
        throw e;
    }
}