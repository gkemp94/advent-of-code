import { getFile } from "../../utils/getInput";

const clone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
}

export const processInput = (input: string): number[][] => {
  return input.split('\n').map(row => row.split('').map(Number));
};

const run = (input: number[][], duplicate: number = 1) => {
  const duplicatedInput = new Array(input.length * duplicate).fill(1).map((row, i) => {
    return new Array(input[0].length * duplicate).fill(1).map((cell, j) => {
      let a = (input[i % input.length][j % input[0].length] + Math.floor(i / input.length) + Math.floor(j / input[0].length));;
      while (a > 9) {
        a -= 9; 
      }
      return a;
    });
  });

  const h = duplicatedInput.length;
  const w = duplicatedInput[0].length;

  const distances = clone(duplicatedInput).map(x => x.map(() => Infinity));
  distances[0][0] = 0;

  const queue: [[number, number], number][] = [[[0, 0], 0]];
  while (queue.length) {
    const [[x1, y1], currentRisk] = queue.pop()!;
    [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dx, dy]) => {
      const newRisk = duplicatedInput[x1 + dx] && duplicatedInput[x1 + dx][y1 + dy]
      if (!newRisk) return;
      const totalRisk = currentRisk + newRisk;
      if (totalRisk < distances[x1 + dx][y1 + dy]) {
        distances[x1 + dx][y1 + dy] = totalRisk;
        queue.push([[x1 + dx, y1 + dy], totalRisk]);
        queue.sort((a, b) => b[1] - a[1]);
      }
    })
  }

  return distances[h - 1][w - 1];
}

export const partOne = (input: number[][]) => run(input);
export const partTwo =  (input: number[][]) => run(input, 5);