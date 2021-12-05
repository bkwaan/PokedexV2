import ProfilePic from "../images/BrockObama.jpg";

const Header = () => {
  const searchPoke = (poke) => {
    var pokemon = document.getElementsByClassName("pokename");
    console.log(pokemon[1].parentElement);

    for (let i = 0; i < pokemon.length; i++) {
      poke = poke.toLowerCase();

      if (!pokemon[i].innerText.toLowerCase().includes(poke)) {
        pokemon[i].parentElement.style.display = "none";
      } else {
        pokemon[i].parentElement.style.display = "block";
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
      <div className="profile-pic">
        <img src={ProfilePic} />
      </div>
    </header>
  );
};

export default Header;
