export function combineReducers(reducers) {
  return function (state = {}, action) {
    const newState = {};
    for (const key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }

    return newState;
  };
}
