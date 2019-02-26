/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import potatoReducer from "./components/potato/potatoReducer.js";
// import tomatoReducer from "./components/tomato/tomatoReducer.js";
// import cabbageReducer from "./components/cabbage/cabbageReducer.js";
// import leekReducer from "./components/leek/leekReducer.js";

const routeInitialState = fromJS({
  location: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

export default function masterReducer() {
  console.log("masterReducer");
  return combineReducers({
    route: routeReducer,
    potato: potatoReducer,
    // tomato: tomatoReducer,
    // cabbage: cabbageReducer,
    // leek: leekReducer,
  });
}