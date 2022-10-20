// TODO: Move to REGEX

type ParsedInput = [[number, number], [number, number]];

export const processInput = (input: string) => {
  return input
    .split(":")[1]
    .split(",")
    .map((val) => {
      return val.split("=")[1].split("..").map(Number);
    }) as [[number, number], [number, number]];
};

export const run = ([[x1, x2], [y1, y2]]: ParsedInput) => {
  let highestPoint = -Infinity;
  let distinctInitialVelocities = 0;
  for (let a = 0; a < 1000; a++) {
    for (let b = -1000; b < 1000; b++) {
      let vx = a;
      let vy = b;
      let x = 0;
      let y = 0;

      let localHigh = -Infinity;
      while (true) {
        x += vx;
        y += vy;
        localHigh = Math.max(localHigh, y);
        vx = Math.max(vx - 1, 0);
        vy = vy - 1;

        if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
          highestPoint = Math.max(highestPoint, localHigh);
          distinctInitialVelocities++;
          break;
        }
        if (x > x2 || (x < x1 && vx === 0) || (vy < 0 && y < y1)) {
          break;
        }
      }
    }
  }
  return {
    highestPoint,
    distinctInitialVelocities,
  };
};

export const partOne = (input: ParsedInput) => run(input).highestPoint;
export const partTwo = (input: ParsedInput) =>
  run(input).distinctInitialVelocities;
