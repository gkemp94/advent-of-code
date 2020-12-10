import { memo } from "../../utils/memo";

export const processInput = (input: string): number[] => {
  return input.split('\n').map(x => parseInt(x)).sort((a, b) => a - b);
};

export const partOne = (input: number[]) => {
  let diffs: Record<number, number> = {};
  for (let i = 0; i <= input.length; i++) {
    const diff = (input[i] || (input[i - 1] + 3)) - (input[i-1] || 0);
    diffs[diff] = diffs[diff] ? diffs[diff] + 1 : 1;
  }
  return diffs[1] * diffs[3];
};

export const getAdapterList = memo<[number, number[]], number>((currentAdapter: number, input: number[]): number => {
  let configurations: number = 0;
  if (input.findIndex(x => !!(x - currentAdapter <= 3)) === -1) return 1;
  while (true) {
    const index = input.findIndex(x => !!(x - currentAdapter <= 3));
    if (index === -1) return configurations;
    const [nextAdapter] = input.splice(index, 1);
    configurations += getAdapterList(nextAdapter, [...input]);
  }
});

export const partTwo = (input: number[]) => getAdapterList(0, [...input, Math.max(...input) + 3]);
