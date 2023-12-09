export const processInput = (input: string) => {
  return input.split("\n").map((x) => x.split(" ").map(Number));
};

const lagrange = (points: number[], x: number) => {
  return Math.round(
    points.reduce((acc, curr, i) => {
      return (
        acc +
        points.reduce((acc, _, j) => {
          return i !== j ? (acc * (x - j)) / (i - j) : acc;
        }, curr)
      );
    }, 0)
  );
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, curr) => acc + lagrange(curr, curr.length), 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, curr) => acc + lagrange(curr, -1), 0);
};
