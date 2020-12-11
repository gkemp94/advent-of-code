const deepClone = <T>(input: T): T => {
  return JSON.parse(JSON.stringify(input));
};

const VECTOR_ARRAY = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

const getSurrounding = (input: string[][], i: number, j: number, extended: boolean) => {
  return VECTOR_ARRAY.map(([x, y]) => {
    let k = 1;
    while(true) {
      const current = input[i + (x * k)] && input[j + (y * k)] && input[i + (x * k)][j + (y * k)];
      if (current === '.' && extended) {
        k++;
        continue;
      } else {
        return current;
      }
    }
  })
};

export const processInput = (input: string): string[][] => {
  return input.split('\n').map(x => x.split(''));
};

export const run = (input: string[][], extended: boolean = false) => {
  let currentPositions = input;
  let isDirty = true;
  while (isDirty) {
    isDirty = false;
    let newPositions = deepClone(currentPositions);
    for (let i = 0; i < currentPositions.length; i++) {
      for (let j = 0; j < currentPositions[0].length; j++) {
        const current = currentPositions[i][j];
        if (current === '.') continue;
        const surronding = getSurrounding(currentPositions, i, j, extended);
        if (current === '#' && surronding.filter(x => x === '#').length >= (extended ? 5 : 4)) {
          newPositions[i][j] = 'L';
          isDirty = true;
        } else if (current === 'L' && surronding.filter(x => x === '#').length === 0) {
          newPositions[i][j] = '#'
          isDirty = true;
        } else {
          newPositions[i][j] = current;
        }
      }
    }
    currentPositions = deepClone(newPositions);
  }
  return currentPositions.reduce((prev: string[], curr) => {
    return prev.concat(curr);
  }, []).filter(x => x === '#').length;
};

export const partOne = (input: string[][]) => run(input);

export const partTwo = (input: string[][]) => run(input, true);
