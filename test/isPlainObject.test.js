import { isPlainObject } from "../src/utils/isPlainObject";

describe("isPlainObject", () => {
  it("should return true with object argument", () => {
    expect(isPlainObject({})).toBeTruthy();
  });

  describe.each([
    ["number", 1],
    ["string", "qwerty"],
    ["null", null],
    ["array", []],
  ])("should return false with %s in %p", (_, value) => {
    expect(isPlainObject(value)).toBeFalsy();
  });
});
