import HomePage from "./component/homepage/HomePage";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import { addPokemon } from "./redux/actions/pokemon";
import { getComment } from "./redux/actions/comment";

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
