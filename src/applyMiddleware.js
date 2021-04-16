import { compose } from "../src/compose";

export function applyMiddleware(...middlewares) {
  return function enhancer(createStore) {
    return function (reducer, initialState) {
      const store = createStore(reducer, initialState);
      const { dispatch, getState } = store;

      const composedDispatch = compose(
        ...middlewares.map((m) => m({ getState, dispatch }))
      )(dispatch);

      return {
        ...store,
        dispatch: composedDispatch,
      };
    };
  };
}
