export const processInput = (input: string): number[] => {
  return input.split(',').map(x => parseInt(x));
};

export const partOne = (input: number[], turns: number) => {
  const cache = new Map<number, number>();
  input.forEach((n, i) => cache.set(n, i + 1));
  let current = 0;
  for (let i = input.length + 1; i < turns; i++) {
    if (cache.has(current)) {
      const lt = cache.get(current)!;
      cache.set(current, i);
      current = i - lt;
    } else {
      cache.set(current, i);
      current = 0;
    }
  }

  return current;
}

export const partTwo = partOne;