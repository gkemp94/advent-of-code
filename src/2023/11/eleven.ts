export const processInput = (input: string): [number[][], number[], number[]] => {
  let points: number[][] = [];
  let emptyRows: number[] = [];
  let emptyColumns: number[] = [];
  let rows = input.split("\n");

  rows.forEach((x, i) => {
    if (!x.includes("#")) {
      emptyRows.push(i);
    }
    x.split("").forEach((x, j) => {
      if (x === "#") {
        points.push([i, j]);
      }
    });
  });

  for (let i = 0; i < rows[0].length; i++) {
    if (rows.every((x) => x[i] === ".")) {
      emptyColumns.push(i);
    }
  }

  return [points, emptyRows, emptyColumns];
};

const between = (a: number, b: number, numbers: number[]) => {
  return numbers.filter((num) => num > Math.min(a, b) && num < Math.max(a, b)).length;
};

export const partOne = ([points, emptyRows, emptyColumns]: ReturnType<typeof processInput>, expansion = 2) => {
  let result = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x0, y0] = points[i];
      const [x1, y1] = points[j];
      result +=
        Math.abs(x1 - x0) +
        Math.abs(y0 - y1) +
        between(x1, x0, emptyRows) * (expansion - 1) +
        between(y0, y1, emptyColumns) * (expansion - 1);
    }
  }

  return result;
};

export const partTwo = partOne;
