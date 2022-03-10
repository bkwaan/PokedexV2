
export const getUser = (state) => {
    return state.user;
}

export const isLoggedIn = (state) => {
    return state.user.ValidOtp;
}

export const isVerifiedUser = (state) => {
    return state.user.isVerified
}

export const getFavoritePokemonClickedId = (state) => {
    return state.user.FavouritePokemonClicked
}