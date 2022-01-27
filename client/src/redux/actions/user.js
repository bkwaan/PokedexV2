import axios from "axios";
import { LOGIN, LOGOUT, VALID_OTP } from '../actions/types'

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


export const verifiedOtp = () => {
    return {
        type: VALID_OTP
    }
}

export const signUp = () => {

}


// Thunks
//Adds user to state after they login and validate their otp
export const verifyOtpCode = (userName, token) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/api/User/VerifyOTP', { UserName: userName, Token: token });
        dispatch(verifiedOtp());
    } catch (e) {
        throw e;
    }
}

export const loginUserAsync = (UserName, Password) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/api/User/Login', { UserName: UserName, Password: Password })
        dispatch(loginUser(res.data.clientInfo));
    } catch (e) {
        throw e;
    }
}





