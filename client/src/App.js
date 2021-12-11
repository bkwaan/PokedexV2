import HomePage from "./component/homepage/HomePage";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import { addPokeDescription, addPokemon } from "./redux/actions/pokemon";

const App = () => {
  useEffect(() => {
    store.dispatch(addPokemon());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <HomePage />
      </div>
    </Provider>
  );
};

export default App;
