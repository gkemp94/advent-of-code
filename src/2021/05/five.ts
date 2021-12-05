export const processInput = (input: string): number[][][] => {
  return input.split('\n').map(row => row.split(' -> ').map(cord => cord.split(',').map(Number)))
};

export const calculateGrid = (input: number[][][], ignoreDiagonal = true) => {
  const map: Record<string, number> = {};
  for (let row of input) {
    if (row[0][0] !== row[1][0] && row[0][1] !== row[1][1] && ignoreDiagonal) {
      continue;
    }
    const mag = Math.sqrt(Math.pow(row[1][0] - row[0][0], 2) + Math.pow(row[1][1] - row[0][1], 2));
    const vector = [(row[1][0] - row[0][0]) / mag, (row[1][1] - row[0][1])/mag];
    const current = row[0];
    const final = row[1];
    if (vector[1] !== 1 && vector[0] !== 1) {
      vector[0] = vector[0] && vector[0] / Math.abs(vector[0]);
      vector[1] = vector[1] && vector[1] / Math.abs(vector[1]);
    }
    while (current[0] !== final[0] || current[1] !== final[1]) {
      map[current.join(',')] = map[current.join(',')] ? map[current.join(',')] + 1 : 1;
      current[0] += vector[0];
      current[1] += vector[1];
    }
    map[current.join(',')] = map[current.join(',')] ? map[current.join(',')] + 1 : 1;
  }
  return Object.entries(map).filter(num => num[1] >= 2).length;
}

export const partOne = (input: number[][][]) => {
  return calculateGrid(JSON.parse(JSON.stringify(input)));
};

export const partTwo = (input: number[][][]) => {
  return calculateGrid(JSON.parse(JSON.stringify(input)), false);
};
