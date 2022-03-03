import PokeCard from "./pokeCard";
import { connect } from "react-redux";

const PokeList = (props) => { 
  return (
    <div className="pokeListContainer">
      <div className="listContainer">
        {
        props.pokemon.map((pokemon,index) => {
          return(
            <PokeCard
              id={pokemon.id}
              key={index}
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
