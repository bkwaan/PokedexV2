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
        {
        props.pokemon.map((pokemon) => {
          return(
            <PokeCard
              id={pokemon.id}
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
