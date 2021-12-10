import PokeCard from "./pokeCard";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

const PokeList = (props) => {

  return (
    <div className="pokeListContainer">
      <div className="searchContainer">
        {/* <input type="text">Search</input> */}
      </div>
      <div className="listContainer">
        {props.pokemon.map((pokemon) => {
          return(
            <PokeCard
              name={pokemon.name}
              id={pokemon.id}
              image={pokemon.sprites.other["official-artwork"].front_default}
              type={pokemon.types[0].type.name}
            />
          )

        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps)(PokeList);
