import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// tools required for persisting state
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const initialState = {};
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// set up config for deciding on which piece of state to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
const persistor = persistStore(store);
export { store, persistor };

/* 
redux-persist 
There are two main components to export in order to use this package
(1.) store → swap the rootReducer with persistReducer with the config for which piece of state to persist 
(2.) persistor → wrap up the "store" so that later it can be supplied to the target component for use

*/
