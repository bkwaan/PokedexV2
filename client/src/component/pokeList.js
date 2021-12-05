import Bulbasaur from "../images/bulbasaur.png";
import PokeCard from "./pokeCard";
import axios from "axios";
import { useEffect, useState } from "react";

const PokeList = () => {
  const [pokeNames, setPokeNames] = useState([]);

  useEffect(async () => {
    try {
      for (var i = 1; i <= 159; i++) {
        var pokes = await axios.get("https://pokeapi.co/api/v2/pokemon/" + i);
        var pokeTypes = [];
        for (var j = 0; j < pokes.data.types.length; j++) {
          pokeTypes.push(pokes.data.types[j].type.name);
        }
        setPokeNames((pokeNames) => [
          ...pokeNames,
          <PokeCard
            name={pokes.data.forms[0].name}
            id={i}
            image={pokes.data.sprites.other["official-artwork"].front_default}
            type={pokeTypes}
          />,
        ]);
        pokeTypes = [];
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="pokeListContainer">
      <div className="searchContainer">
        {/* <input type="text">Search</input> */}
      </div>
      <div className="listContainer">{pokeNames}</div>
    </div>
  );
};

export default PokeList;
