
const PokeEvol = (props) => {
  return (
      <div className="pokeEvolution">
        <img className="pokeEvolImg" src={props.image} />
        <img className="pokeEvolImg" src={props.image2} />
        <img className="pokeEvolImg" src={props.image3} />
        <img className="pokeEvolImg" src={props.image4} />
      </div>
  );
};

export default PokeEvol;
