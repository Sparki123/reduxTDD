export const compose = (...fns) => {
  const reversedFns = [...fns].reverse();
  return function (value) {
    let result = value;
    for (const fn of reversedFns) {
      result = fn(result);
    }

    return result;
  };
};
