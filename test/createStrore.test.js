import { createStore } from "../src/createStore.js";

describe("createStore", () => {
  it("should return store with methods getState, dispatch, subscribe", () => {
    const reducer = () => {};

    const store = createStore(reducer);

    const keys = Object.keys(store);

    expect(keys).toContain("getState");
    expect(keys).toContain("dispatch");
    expect(keys).toContain("subscribe");
    expect(keys).toHaveLength(3);
  });

  it("should throw exception with incorrect reducer argument", () => {
    expect(() => createStore(1)).toThrow(/reducer must be a function/);
    expect(() => createStore(undefined)).toThrow(/reducer must be a function/);
    expect(() => createStore(() => {})).not.toThrow();
  });

  it("should set default state", () => {
    const reducer = () => {};

    const initialState = {
      test: "test",
    };

    const store = createStore(reducer, initialState);

    expect(store.getState()).toEqual({
      test: "test",
    });
  });

  it("should apply reducer to previous state", () => {
    const reducer = (state, action) => {
      if (action.type === "INCREMENT") return state + 1;
      return state;
    };
    const store = createStore(reducer, 0);

    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toBe(1);

    store.dispatch({ type: "INCREMENT" });
    expect(store.getState()).toBe(2);
  });

  it("dispatch should recive plain object with type property", () => {
    const reducer = (state, action) => {
      if (action.type === "INCREMENT") return state + 1;
      return state;
    };
    const store = createStore(reducer, 0);
    expect(() => store.dispatch(1)).toThrow(
      /argument should be plain object with type property/
    );
    expect(() => store.dispatch({})).toThrow(
      /argument should be plain object with type property/
    );
    expect(() => store.dispatch({ type: "INCREMENT" })).not.toThrow();
  });

  it("should invoke subcriber when dispatch was called", () => {
    const listener = jest.fn();

    const reducer = (state, action) => {
      if (action.type === "INCREMENT") return state + 1;
      return state;
    };
    const store = createStore(reducer, 0);

    store.subscribe(listener);

    store.dispatch({ type: "INCREMENT" });
    expect(listener.mock.calls).toHaveLength(1);
    store.dispatch({ type: "INCREMENT" });
    expect(listener.mock.calls).toHaveLength(2);
  });

  it("should invoke multiple listeners", () => {
    const listenerOne = jest.fn();
    const listenerTwo = jest.fn();

    const reducer = (state, action) => {
      if (action.type === "INCREMENT") return state + 1;
      return state;
    };
    const store = createStore(reducer, 0);

    store.subscribe(listenerOne);
    store.subscribe(listenerTwo);

    store.dispatch({ type: "INCREMENT" });
    expect(listenerOne.mock.calls).toHaveLength(1);
    expect(listenerTwo.mock.calls).toHaveLength(1);
    store.dispatch({ type: "INCREMENT" });
    expect(listenerOne.mock.calls).toHaveLength(2);
    expect(listenerTwo.mock.calls).toHaveLength(2);
  });

  it("should delete listener when unsubcribe was called", () => {
    const listenerOne = jest.fn();
    const listenerTwo = jest.fn();

    const reducer = (state, action) => {
      if (action.type === "INCREMENT") return state + 1;
      return state;
    };
    const store = createStore(reducer, 0);

    const unsubscribe = store.subscribe(listenerOne);
    store.subscribe(listenerTwo);

    store.dispatch({ type: "INCREMENT" });
    expect(listenerOne.mock.calls).toHaveLength(1);
    expect(listenerTwo.mock.calls).toHaveLength(1);

    unsubscribe();

    store.dispatch({ type: "INCREMENT" });
    expect(listenerOne.mock.calls).toHaveLength(1);
    expect(listenerTwo.mock.calls).toHaveLength(2);
  });
});
