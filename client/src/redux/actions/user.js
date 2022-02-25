import axios from "axios";
import { LOGIN, LOGOUT, VALID_OTP, UPDATE_PROFILE_DATA } from '../actions/types'

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

export const updateProfile = (data)=> {
    return {
        type: UPDATE_PROFILE_DATA,
        payload: data
    }
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


export const updateUserAsync = (userData) => async (dispatch, getState) => {
    try {
        const res = await axios.post('api/User/UpdateUser', userData)
        console.log(res.data.clientInfo)
        dispatch(updateProfile(res.data.clientInfo));
    } catch (e) {
        throw e;
    }
}





