export const getUser = (state) => {
    return state.user;
}

export const isLoggedIn = (state) => {
    return state.user.ValidOtp;
}