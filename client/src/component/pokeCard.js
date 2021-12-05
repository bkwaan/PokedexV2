import Bulbasaur from "../images/bulbasaur.png";
import { useEffect, useState } from "react";

const PokeCard = (props) => {
  const [id, setID] = useState(props.id);
  const [type, setType] = useState(props.type);
  const [name, setName] = useState(props.name);

  const checkID = (id) => {
    if (id <= 9) {
      setID("00" + id);
    } else if (id < 100 && id > 9) {
      setID("0" + id);
    }
  };

  const upperName = () => {
    var x = name.toString();
    x = x.charAt(0).toUpperCase() + x.slice(1);
    setName(x);
  }

  const openPoke = () =>{
    alert("HI");
  }
  useEffect(() => {
    checkID(id);
    upperName();
  }, []);

  return (
    <div className="pokeCardContainer">
      <div className="pokecard" onClick={openPoke}>
        <div className="pokeheader">
          <img src={props.image} alt="pokeImg" />
          <span className="pokenumber">#{id}</span>
        </div>
        <p className="pokename">{name}</p>
        <div className="typetags">
            {type.map((v) => {
              return (
                <div className={"tag " + v }>
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
