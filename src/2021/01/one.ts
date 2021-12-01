export const processInput = (input: string) => {
  return input.split('\n').map(x => parseInt(x));
};

const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

export const partOne = (input: number[]) => {
  return input.reduce((acc, _, i) => {
    if (i === 0) return acc;
    return input[i - 1] < input[i] ? acc + 1 : acc;
  }, 0);
};

export const partTwo = (input: number[]) => {
  return input.reduce((acc, _, i) => {
    if (i < 3) return acc;
    return sum(input.slice(i - 2, i + 1)) > sum(input.slice(i - 3, i)) ? acc + 1 : acc;
  }, 0);
};
