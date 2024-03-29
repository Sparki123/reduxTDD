import { isPlainObject } from "./utils/isPlainObject";

export function createStore(reducer, initialState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error("reducer must be a function");
  }

  // TODO create test
  if (typeof initialState === "function") {
    enhancer = initialState;
    initialState = undefined;
  }

  // TODO create test
  if (!["undefined", "function"].includes(typeof enhancer)) {
    throw new Error("enhancer must be a function");
  }

  if (enhancer !== undefined) {
    return enhancer(createStore)(reducer, initialState);
  }

  let state = initialState;
  let listeners = [];

  return {
    getState() {
      return state;
    },

    dispatch(action) {
      if (!(isPlainObject(action) && "type" in action)) {
        throw new Error("argument should be plain object with type property");
      }
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },

    subscribe(listener) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
}
