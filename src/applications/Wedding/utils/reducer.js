import requester from "./requester.js";

function reducer(state = {}, action) {
  switch (action.type) {
    case "UPDATE_STORE":
      return Object.assign({}, state, action.payload)  // <–– return new state
    case "HIDE_SIDEBAR":
      return Object.assign({}, state, action.payload)
    case "REQ_TO_DATABASE":
    	requester.editPotato(action.payload.id, action.payload.WHATEVER);
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}

export default reducer;