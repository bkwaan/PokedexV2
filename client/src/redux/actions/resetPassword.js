import axios from "axios"
import { RESET_PASSWORD } from "./types"

export const resetPassword = (msg) => {
    return {
        type: RESET_PASSWORD,
        payload: msg
    }
}

export const resetPasswordAsync = (Email, Password, Token) => async (dispatch) => {
    try {
        const resetPassRes = await axios.post(`/api/User/ResetPassword`, {Email, Password, Token })
        const { Msg, Success } = resetPassRes.data
        dispatch(resetPassword({ Msg, Success }))
    } catch (e) {
        const { Msg, Success } = e.response.data
        dispatch(resetPassword({ Msg, Success }))
    }
}