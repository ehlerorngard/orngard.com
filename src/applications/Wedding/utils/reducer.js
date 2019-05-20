function reducer(state = {}, action) {
  switch (action.type) {
    case "UPDATE_STORE":
      return Object.assign({}, state, action.payload)  // <–– return new state
    default:
      return state;
  }
}

export default reducer;