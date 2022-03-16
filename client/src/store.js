import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import { persistStore, persistReducer } from 'redux-persist'

const initialState = {};

const middleware = [thunk];

export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store)