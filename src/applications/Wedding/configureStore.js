import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from "redux-thunk";
import reducer from "./utils/reducer.js";

export default function configureStore(initialState = {}, history) {
  // Create the store with middlewares:
  // 1. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  const store = createStore(
    reducer,
    fromJS({...initialState}),
    composeEnhancers(...enhancers)
  );

  return store;
}