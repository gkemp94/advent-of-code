export const processInput = (input: string) => {
  return input.split("\n").map((line) => line.split(" "));
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  const points: Record<string, Record<string, number>> = {
    A: { X: 3 + 1, Y: 6 + 2, Z: 0 + 3 },
    B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
    C: { X: 6 + 1, Y: 0 + 2, Z: 3 + 3 },
  };
  return input.reduce((acc, [them, me]) => {
    return acc + points[them][me];
  }, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  const points: Record<string, Record<string, number>> = {
    A: { X: 0 + 3, Y: 3 + 1, Z: 6 + 2 },
    B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
    C: { X: 0 + 2, Y: 3 + 3, Z: 6 + 1 },
  };
  return input.reduce((acc, [them, me]) => {
    return acc + points[them][me];
  }, 0);
};
