export const processInput = (input: string): string[][] => {
  return input.split('\n').map(x => x.split(''));
};

export const partOne = (input: string[][], v: number [] = [1, 3]) => {
  let ans = 0;
  let pos = [0, 0];
  let width = input[0].length;
  while (pos[0] < input.length) {
    ans += input[pos[0]][pos[1] % width] === '#' ? 1 : 0;
    pos[0] += v[0];
    pos[1] += v[1];
  }
  return ans;
};

export const partTwo = (input: string[][]) => {
  const vs = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];
  return vs.reduce((curr, v) => {
    return curr * partOne(input, v);
  }, 1);
};
