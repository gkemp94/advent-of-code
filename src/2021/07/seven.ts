export const processInput = (input: string): number[] => {
  return input.split(',').map(Number);
};

export const partOne = (input: number[]) => {
  const min = Math.min(...input);
  const max = Math.max(...input);
  let i = min;
  let leastFuel = Infinity;
  while (i < max) {
    const fuel = input.reduce((acc, curr) => acc + Math.abs(i - curr), 0);
    if (fuel < leastFuel) {
      leastFuel = fuel;
    }
    i++
  }
  return leastFuel;
};

export const partTwo = (input: number[]) => {
  const min = Math.min(...input);
  const max = Math.max(...input);
  let i = min;
  let leastFuel = Infinity;
  while (i < max) {
    const fuel = input.reduce((acc, curr) => {
      const n = Math.abs(i - curr);
      return acc + (n * (n+1))/2;
    }, 0);
    if (fuel < leastFuel) {
      leastFuel = fuel;
    }
    i++
  }
  return leastFuel;
};
