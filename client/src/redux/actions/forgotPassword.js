import axios from "axios";
import { FORGOT_PASSWORD, CLEAR_FORGOT_PASSWORD } from '../actions/types'


export const forgotPassword = (data) => {
    return {
        type: FORGOT_PASSWORD,
        payload: data
    }
}

export const clearForgotPassword = () => {
    return {
        type: CLEAR_FORGOT_PASSWORD
    }
}

export const forgotPasswordAsync = (UserName) => async (dispatch, getState) => {
    const res = await axios.get(`/api/User/ForgotPassword/${UserName}`)
    const { Msg, Success } = res.data
    dispatch(forgotPassword({ Msg, Success }));
}