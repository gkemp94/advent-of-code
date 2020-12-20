type Memoizable = (...args: any[]) => any;

export function memo<T extends Memoizable>(func: T) {
  const memoized = function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new Map<string, ReturnType<T>>();
  return memoized;
};