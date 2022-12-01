export const processInput = (input: string) => {
  return input.split("\n\n").map((x) => x.split("\n").map((x) => Number(x)));
};

export const partOne = (input: number[][]) => {
  return Math.max(...input.map((x) => x.reduce((acc, curr) => acc + curr, 0)));
};

export const partTwo = (input: number[][]) => {
  return input
    .map((x) => x.reduce((acc, curr) => acc + curr, 0))
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((acc, curr) => acc + curr, 0);
};
