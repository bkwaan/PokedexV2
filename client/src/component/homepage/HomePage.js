import Header from "../header";
import PokeList from "../pokeList";
import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import PokeCard from "../pokeCard";

const HomePage = () => {
  return (
    <div>
      <Header />
      <PokeList/>
    </div>
  );
};
export default HomePage;
