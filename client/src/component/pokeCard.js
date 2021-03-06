import { useEffect, useState } from "react";
import PokeModal from "./pokemodal/pokeModal";
import { connect, useDispatch, useSelector } from "react-redux";
import { getFavoritePokemonClickedId } from "../redux/Selectors/user";
import { profilePokeClickedClear } from "../redux/actions/user";
import { getComment } from "../../src/redux/actions/comment";

const PokeCard = (props) => {
  const [id, setID] = useState("");
  const [type, setType] = useState([]);
  const [show, setShow] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const favPokeClickedId = useSelector(getFavoritePokemonClickedId);
  const dispatch = useDispatch();
  var idz = props.id;

  var name = props.pokemon[idz - 1].name;
  name = name.charAt(0).toUpperCase() + name.slice(1);

  const getType = () => {
    const pokemon = props.pokemon[idz - 1].types;
    pokemon.map((types) => {
      setType((type) => [...type, types.type.name]);
    });
  };
  const checkID = (id) => {
    if (idz <= 9) {
      setID("00" + id);
    } else if (id < 100 && id > 9) {
      setID("0" + id);
    } else {
      setID(id);
    }
  };

  const openPoke = () => setShow(true);

  const handleClose = () => {
    setShow((show) => !show);
  };

  const firstOpen = () => {
    if (firstClick) {
      props.getComment(idz);
      setFirstClick(false);
    }
  };

  const isClickedFromFavorites = () => {
    if (favPokeClickedId === idz) {
      openPoke();
      firstOpen();
      dispatch(profilePokeClickedClear());
    }
  };

  useEffect(() => {
    checkID(idz);
    getType();
    isClickedFromFavorites();
  }, []);

  return (
    <div className="pokeCardContainer">
      <PokeModal
        show={show}
        handleClose={handleClose}
        id={id}
        pokeID={idz}
        types={type}
        image={
          props.pokemon[idz - 1].sprites.other["official-artwork"].front_default
        }
        name={name}
      />
      <div
        className="pokecard"
        onClick={() => {
          openPoke();
          firstOpen();
        }}
      >
        <div className="pokeheader">
          <img
            src={
              props.pokemon[idz - 1].sprites.other["official-artwork"]
                .front_default
            }
            alt="pokeImg"
          />
          <span className="pokenumber">#{id}</span>
        </div>
        <p className="pokename">{name}</p>
        <div className="typetags">
          {type.map((v, index) => {
            return (
              <div className={"tag " + v} key={index}>
                <p>{v}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps, { getComment })(PokeCard);
