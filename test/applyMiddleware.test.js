import { applyMiddleware } from "../src/applyMiddleware";
import { createStore } from "../src/createStore";

const addTwoToHello = ({ getState, dispatch }) => (next) => (action) => {
  if ("hello" in action) {
    return next({ action, hello: action.hello + 2 });
  }
  return next(action);
};

describe("applyMiddleware", () => {
  it("wraps dispatch with logger middleware", () => {
    const log = jest.fn();
    const logger = ({ getState, dispatch }) => (next) => (action) => {
      log(action);
      return next(action);
    };

    const enhancer = applyMiddleware(logger);

    const reducer = (state = {}, action) => {
      if (action.type === "ADD") {
        return { ...state, [action.key]: action.value };
      }
      return state;
    };

    const store = createStore(reducer, enhancer);

    store.dispatch({
      type: "ADD",
      key: "abc",
      value: "xyz",
    });

    expect(log).toHaveBeenCalledWith({
      type: "ADD",
      key: "abc",
      value: "xyz",
    });

    expect(store.getState()).toEqual({
      abc: "xyz",
    });
  });

  it("wraps dispatch with several middleware with right order", () => {
    const addTwo = ({ getState, dispatch }) => (next) => (action) => {
      return next({ ...action, test: action.test + 2 });
    };

    const multipleToTwo = ({ getState, dispatch }) => (next) => (action) => {
      return next({ ...action, test: action.test * 2 });
    };

    const addThree = ({ getState, dispatch }) => (next) => (action) => {
      return next({ ...action, test: action.test + 3 });
    };

    const enhancer = applyMiddleware(addTwo, multipleToTwo, addThree);

    const reducer = (state = {}, action) => {
      if (action.type === "ADD") {
        return { ...state, test: action.test };
      }
      return state;
    };

    const store = createStore(reducer, enhancer);

    store.dispatch({
      type: "ADD",
      test: 7,
    });

    expect(store.getState()).toEqual({
      test: 21,
    });
  });
});
