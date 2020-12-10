export const memo = <T extends any[], J>(func: (...args: T) => J) => {
  const cache: Record<string, J> = {};
  let saved = 0;
  let run = 0;
  return (...args: T): J => {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      run++;
      cache[key] = func(...args);
    } else {
      saved++;
    }

    return cache[key];
  }
};
