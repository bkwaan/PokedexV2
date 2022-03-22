import ProfilePic from "../images/BrockObama.jpg";
import NavbarSide from "./navbarSide";

const Header = ({ isSearchEnabled }) => {
  const searchPoke = (poke) => {
    var pokemon = document.getElementsByClassName("pokename");
    for (let i = 0; i < pokemon.length; i++) {
      poke = poke.toLowerCase();
      if (!pokemon[i].innerText.toLowerCase().includes(poke)) {
        pokemon[i].parentElement.style.display = "none";
      } else {
        pokemon[i].parentElement.style.display = "flex";
      }
    }
  };

  return (
    <header className="Header">
      <NavbarSide />
      <h1>POKEDEX</h1>
      {isSearchEnabled &&
        <input
          type="texxt"
          placeholder="Search"
          onChange={(e) => searchPoke(e.target.value)}
        ></input>
      }
    </header>
  );
};

export default Header;
