export const memo = <T extends any[], J>(func: (...args: T) => J) => {
  const cache: Record<string, J> = {};
  return (...args: T): J => {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = func(...args);
    }
    return cache[key];
  }
};
