import Bulbasaur from "../images/bulbasaur.png";
import { useEffect, useState } from "react";

const PokeCard = (props) => {
  const [id, setID] = useState(props.id);
  const [type, setType] = useState(props.type);

  const checkID = (id) => {
    if (id <= 9) {
      setID("00" + id);
    } else if (id < 100 && id > 9) {
      setID("0" + id);
    }
  };

  useEffect(() => {
    checkID(id);
  }, []);

  return (
    <div className="pokeCardContainer">
      <div className="pokecard">
        <div className="pokeheader">
          <img src={props.image} alt="pokeImg" />
          <span className="pokenumber">#{id}</span>
        </div>
        <p className="pokename">{props.name}</p>
        <div className="typetags">
            {type.map((v) => {
              return (
                <div className="tag">
                  <p>{v}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
