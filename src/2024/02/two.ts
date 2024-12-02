export const processInput = (input: string) => input.split("\n").map((line) => line.split(" ").map(Number));

const getIsSafe = (line: number[]) => {
  const dir = Math.abs(line[1] - line[0]) / (line[1] - line[0]);
  for (let i = 1; i < line.length; i++) {
    const diff = line[i] - line[i - 1];
    const absDiff = Math.abs(diff);
    if (absDiff < 1 || absDiff > 3 || absDiff / diff !== dir) {
      return false;
    }
  }
  return true;
};

const getIsSafeWithDamper = (line: number[]) => {
  if (getIsSafe(line)) {
    return true;
  }
  for (let i = 0; i < line.length; i++) {
    const newLine = [...line];
    newLine.splice(i, 1);
    if (getIsSafe(newLine)) {
      return true;
    }
  }
  return false;
};

export const partOne = (input: ReturnType<typeof processInput>) =>
  input.reduce((acc, curr) => (getIsSafe(curr) ? acc + 1 : acc), 0);

export const partTwo = (input: ReturnType<typeof processInput>) =>
  input.reduce((acc, curr) => (getIsSafeWithDamper(curr) ? acc + 1 : acc), 0);
