import axios from "axios"
import { RESET_PASSWORD, VALID_RESET_TOKEN } from "./types"

// const verifyResetToken = (msg) =>{
//     return {
//         type: VALID_RESET_TOKEN
//         payload:msg
//     }
// }

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