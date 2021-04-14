import { compose } from "../src/compose";

describe("compose", () => {
  it("should return function composition", () => {
    const addOne = (a) => a + 1;
    const multTwo = (b) => b * 2;
    const multThree = (b) => b * 3;

    const composeFn = compose(addOne, multTwo, multThree);
    // compose from right to left
    // like x => addOne(multTwo(multThree(x)))

    expect(composeFn).toBeInstanceOf(Function);
    expect(composeFn(5)).toBe(31);
  });

  it("should return pure function", () => {
    const addOne = (a) => a + 1;
    const multTwo = (b) => b * 2;

    const composeFn = compose(addOne, multTwo);

    expect(composeFn(5)).toBe(11);
    expect(composeFn(5)).toBe(11);
  });

  it("should return identity function when no arguments passed", () => {
    const composeFn = compose();

    expect(composeFn(5)).toBe(5);
    expect(composeFn(6)).toBe(6);
  });
});
