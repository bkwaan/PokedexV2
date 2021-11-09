import Bulbasaur from "../../images/bulbasaur.png";
import { BsArrowRight } from "react-icons/bs";

const PokeEvol = () => {
  return (
      <div className="pokeEvolution">
        <img className="pokeEvolImg" src={Bulbasaur} />
        <div className="pokeLvlInfo">
          <p className="pokeEvolLvl">Level 16</p>
          <BsArrowRight/>
        </div>
        <img className="pokeEvolImg" src={Bulbasaur} />
      </div>
  );
};

export default PokeEvol;
