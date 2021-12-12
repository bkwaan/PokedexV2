import Bulbasaur from "../images/bulbasaur.png";
import { useEffect, useState } from "react";
import PokeModal from "./pokemodal/pokeModal";

const PokeCard = (props) => {
  const [id, setID] = useState(props.id);
  const [type, setType] = useState(props.type);
  const [name, setName] = useState(props.name);
  const [show, setShow] = useState(false);
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defence, setDefence] = useState("");
  // const [speed, setSpeed] = useState("");
  // const [stats, setStats] = useState(props.stats);

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
  };

  const openPoke = () => {
    setShow(!show);
  };

  useEffect(() => {
    checkID(id);
    upperName();
  }, []);

  return (
    <div className="pokeCardContainer">
      <div className="pokecard" onClick={openPoke}>
        {/* <PokeModal
          show={show}
          name={name}
          id={id}
          image={props.image}
          type={type}
          hp={stats[0].base_stat}
          attack={stats[1].base_stat}
          defence={stats[2].base_stat}
          speed={stats[5].base_stat}
        /> */}
        <div className="pokeheader">
          <img src={props.image} alt="pokeImg" />
          <span className="pokenumber">#{id}</span>
        </div>
        <p className="pokename">{name}</p>
        <div className="typetags">
          {/* {type.map((v) => {
            return (
              <div className={"tag " + v}>
                <p>{v}</p>
              </div>
            );
          })} */ props.type}
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
