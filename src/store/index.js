import { createStore } from 'redux';

// Default state
const initialState = {
  active: ""
}

const reducer = (state = initialState, action) => {
  // Switch action.type
  switch (action.type) {
    case "ACTIVATE":
      return Object.assign({}, state, {active: action.payload});
    default:
      return state
  }
}

// Create Store
const store = createStore(reducer,initialState);

export default store;
