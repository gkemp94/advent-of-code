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
  const result: number[] = [...input[0]];
  const hasMoved = new Array(result.length).fill(false);
  const maps = input[1];
  for (let i = 0; i < maps.length; i++) {
    const map = maps[i];
    hasMoved.forEach((_, i) => (hasMoved[i] = false));
    for (let j = 0; j < map.length; j++) {
      const [dest, source, length] = map[j];
      result.forEach((value, index) => {
        if (!hasMoved[index] && value >= source && value <= source + length) {
          result[index] = value + (dest - source);
          hasMoved[index] = true;
        }
      });
    }
  }

  return Math.min(...result);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  const [row, stages] = input;
  let ranges = [];

  for (let i = 0; i < row.length; i = i + 2) {
    ranges.push([row[i], row[i] + row[i + 1] - 1]);
  }

  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    const tmp: number[][] = [...ranges];
    const res: number[][] = [];

    for (let j = 0; j < stage.length; j++) {
      const [dest, source, length] = stage[j];
      const minX = source;
      const maxX = source + length - 1;
      const diff = dest - source;

      for (let k = 0; k < tmp.length; ) {
        const [min, max] = tmp[k];

        if (Math.min(max, maxX) < Math.max(min, minX)) {
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

      ranges = [...tmp, ...res];
    }
  }

  return Math.min(...ranges.flat());
};
