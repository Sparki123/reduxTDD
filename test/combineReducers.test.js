import { combineReducers } from "../src/combineReducers";

describe("combineReducers", () => {
  it("should retu", () => {
    const reducerCounter = (state = 0, action) => {
      if (action.type === "INCREMENT") {
        return state + 1;
      }
      if (action.type === "XXX") {
        return state * 10;
      }
      return state;
    };

    const reducerList = (state = [], action) => {
      if (action.type === "ADD") {
        return [...state, action.payload];
      }
      if (action.type === "XXX") {
        return state.map((x) => x.repeat(2));
      }
      return state;
    };

    const reducer = combineReducers({
      a: reducerCounter,
      b: reducerList,
    });

    const state1 = reducer(undefined, { type: "INCREMENT" });
    expect(state1).toEqual({
      a: 1,
      b: [],
    });

    const state2 = reducer(state1, { type: "INCREMENT" });
    expect(state2).toEqual({
      a: 2,
      b: [],
    });

    const state3 = reducer(state2, { type: "ADD", payload: "qwe" });
    expect(state3).toEqual({
      a: 2,
      b: ["qwe"],
    });

    const state4 = reducer(state3, { type: "XXX", payload: "qwe" });
    expect(state4).toEqual({
      a: 20,
      b: ["qweqwe"],
    });
  });
});
