export const processInput = (input: string) => {
  return input.split("\n\n").map((puzzle) => {
    return puzzle.split("\n").map((x) => x.split(""));
  });
};

const transpose = (arr: any[][]) => arr[0].map((_, i) => arr.map((x) => x[i]));

const getDiff = (a: string[], b: string[]) => a.filter((x, i) => x !== b[i]).length;

export const solvePuzzle = (puzzle: string[][], smudge: boolean = false): number => {
  for (let i = 1; i < puzzle.length; i++) {
    let topRowPointer = i - 1;
    let bottomRowPointer = i;
    let hasUsedSmudge = !smudge;

    while (true) {
      if (!puzzle[topRowPointer] || !puzzle[bottomRowPointer]) {
        if (hasUsedSmudge) {
          return i;
        }
        break;
      } else if (getDiff(puzzle[topRowPointer], puzzle[bottomRowPointer]) === 1 && !hasUsedSmudge) {
        hasUsedSmudge = true;
      } else if (getDiff(puzzle[topRowPointer], puzzle[bottomRowPointer])) {
        break;
      }
      topRowPointer--;
      bottomRowPointer++;
    }
  }
  return 0;
};

export const partOne = (input: ReturnType<typeof processInput>, smudge = false) => {
  return input.reduce((acc, curr) => {
    const num = solvePuzzle(curr, smudge) * 100 || solvePuzzle(transpose(curr), smudge);
    return acc + num;
  }, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => partOne(input, true);
