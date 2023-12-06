export const processInput = (input: string): [number[], number[][][]] => {
  const [a, ...b] = input.split("\n\n");
  const seeds = a
    .split(":")[1]
    .split(" ")
    .filter((x) => x)
    .map(Number);
  const maps = b.map((x) => {
    const [_, ...b] = x.split("\n");
    return b.map((x) => x.split(" ").map(Number));
  });

  return [seeds, maps];
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  let result: number[] = [...input[0]];
  const maps = input[1];

  for (let i = 0; i < maps.length; i++) {
    const map = maps[i];
    const tmp = [...result];
    const hasMoved = new Array(tmp.length).fill(false);
    for (let j = 0; j < map.length; j++) {
      const [dest, source, length] = map[j];
      result.forEach((value, index) => {
        // <= or <
        if (value === 53) {
          // console.log({ value, source, dest, length, diff: dest - source });
        }

        if (!hasMoved[index] && value >= source && value <= source + length) {
          tmp[index] = value + (dest - source);
          hasMoved[index] = true;
        }
      });
    }

    result = tmp;
  }

  return Math.min(...result);
};

function checkOverlap(x1: number, x2: number, y1: number, y2: number) {
  // Ensure x1 <= x2 and y1 <= y2
  [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
  [y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];

  // Check for overlap
  if (x2 < y1 || y2 < x1) {
    return false; // No overlap
  } else {
    return true; // There is an overlap
  }
}

export const partTwo = (input: ReturnType<typeof processInput>) => {
  const [row, stages] = input;
  let ranges = [];

  for (let i = 0; i < row.length; i = i + 2) {
    ranges.push([row[i], row[i] + row[i + 1]]);
  }

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    const tmp: number[][] = [...ranges];
    const res: number[][] = [];

    for (let j = 0; j < stage.length; j++) {
      const [dest, source, length] = stage[j];
      const minX = source;
      const maxX = source + length;
      const diff = dest - source;

      for (let k = 0; k < tmp.length; ) {
        const [min, max] = tmp[k];

        if (!checkOverlap(min, max, minX, maxX)) {
          k++;
          continue;
        }

        tmp.splice(k, 1);

        if (min < minX) {
          tmp.push([min, minX - 1]);
        }

        res.push([Math.max(min, minX) + diff, Math.min(max, maxX) + diff]);

        if (max > maxX) {
          tmp.push([maxX + 1, max]);
        }
      }

      ranges = [...tmp, ...res].sort((a, b) => a[0] - b[0]);
    }
  }

  return Math.min(...ranges.flat());
};
