import { count } from "console";

export const processInput = (input: string): number[] => {
  return input.split(',').map(Number);
};

export const run = (input: number[], iter = 80) => {
  let counts: { [num: number]: number }= {};
  for (let number of input) {
    counts[number] = counts[number] ? counts[number] + 1 : 1;
  }

  for (let i = 0; i<iter;i++) {
    counts = Object.entries(counts).reduce((acc: Record<number, number>, [_timer, count]: any) => {
      let timer = Number(_timer);
      if (timer) {
        return {
          ...acc,
          [timer - 1]: acc[timer - 1] ? acc[timer - 1] + count : count,
        }
      } else {
        return {
          ...acc,
          6: acc[6] ? acc[6] + count : count,
          8: acc[8] ? acc[8] + count : count,
        }
      }
    }, {})
  }
  return Object.entries(counts).reduce((acc, [_, count]) => acc + count, 0);
}

export const partOne = (input: number[]) => {
  return run(input);
};

export const partTwo = (input: number[]) => {
  return run(input, 256);
};
