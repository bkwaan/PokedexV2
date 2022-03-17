import ProfilePic from "../images/BrockObama.jpg";
import HeaderDropDown from "./headerDropDown";

const Header = () => {
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
      <div class="menu-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1>POKEDEX</h1>
      <input
        type="texxt"
        placeholder="Search"
        onChange={(e) => searchPoke(e.target.value)}
      ></input>
      <HeaderDropDown/>
    </header>
  );
};

export default Header;
