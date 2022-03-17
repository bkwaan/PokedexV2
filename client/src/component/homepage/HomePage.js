import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAsync } from "../../redux/actions/user";
import { getUser } from "../../redux/Selectors/user";
import Header from "../header";
import PokeList from "../pokeList";

const HomePage = () => {

  const user = useSelector(getUser);
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.ValidOtp) {
      dispatch(getUserDataAsync())
    }
  }, [user.id])

  return (
    <div>
      <Header />
      <PokeList />
    </div>
  );
};
export default HomePage;
