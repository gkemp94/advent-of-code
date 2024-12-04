export const processInput = (input: string) => {
  return input.split("\n").map((x) => x.split(""));
};

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
];
const word = ["X", "M", "A", "S"];

const isXmasDir = (input: ReturnType<typeof processInput>, i: number, j: number, dx: number, dy: number) => {
  let f = i;
  let e = j;
  for (let g = 1; g < word.length; g++) {
    f = f + dx;
    e = e + dy;
    if (!input[f]) {
      return false;
    }
    if (input[f][e] !== word[g]) {
      return false;
    }
  }
  return true;
};

const isXmas = (input: ReturnType<typeof processInput>, i: number, j: number) => {
  if (input[i][j] !== word[0]) {
    return 0;
  }
  let result = 0;
  for (let k = 0; k < dirs.length; k++) {
    if (isXmasDir(input, i, j, dirs[k][0], dirs[k][1])) {
      result++;
    }
  }
  return result;
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      count += isXmas(input, i, j);
    }
  }
  return count;
};

const adjDir = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

const isXmasPartTwo = (input: ReturnType<typeof processInput>, i: number, j: number) => {
  if (input[i][j] !== "A") {
    return 0;
  }
  const dirChars: [number, number, string | undefined][] = adjDir.map(([dx, dy]) => [
    dx,
    dy,
    input[i + dx] ? input[i + dx][j + dy] : undefined,
  ]);
  const ms = dirChars.filter((curr) => curr[2] === "M");
  const ss = dirChars.filter((curr) => curr[2] === "S");
  if (ms.length < 2 || ss.length < 2) {
    return 0;
  }

  // Is M on one side
  let hasMonOnSide = false;
  for (let f = 0; f < ms.length - 1; f++) {
    for (let k = f + 1; k < ms.length; k++) {
      if (ms[f][0] === ms[k][0] || ms[f][1] === ms[k][1]) {
        hasMonOnSide = true;
      }
    }
  }

  let hasSOnOneSide = false;
  for (let f = 0; f < ss.length - 1; f++) {
    for (let k = f + 1; k < ss.length; k++) {
      if (ss[f][0] === ss[k][0] || ss[f][1] === ss[k][1]) {
        hasSOnOneSide = true;
      }
    }
  }

  return hasMonOnSide && hasSOnOneSide ? 1 : 0;
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      count += isXmasPartTwo(input, i, j);
    }
  }
  return count;
};
