export const getFavoritePokemon = (state) => {
    const newArray = state.pokemon.filter(x =>{
        if(state.user.FavouritePokemon.includes(x.id)){
            return x
        }
    })
    return newArray
}