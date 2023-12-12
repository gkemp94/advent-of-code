import { memo } from "../../utils/memo";

export const processInput = (input: string) =>
  input.split("\n").map((line) => {
    const [map, numbers] = line.split(" ");
    return {
      map: map.split(""),
      numbers: numbers.split(",").map(Number),
    };
  });

const processLine = memo((map: string[], [number, ...numbers]: number[]): number => {
  let configNum = 0;
  for (let i = 0; i < map.length - number + 1; i++) {
    const before = map.slice(0, i);
    const slice = map.slice(i, i + number);
    const next = map[i + number];
    const after = map.slice(i + number);
    const afterDeltaOne = map.slice(i + number + 1);

    if (slice.every((value) => value === "?" || value === "#") && next !== "#" && before.every((x) => x !== "#")) {
      if (!numbers.length && after.every((x) => x !== "#")) {
        configNum++;
      } else if (numbers.length && afterDeltaOne.length) {
        configNum += processLine(afterDeltaOne, numbers);
      }
    }
  }

  return configNum;
});

export const partOne = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, { map, numbers }) => {
    return acc + processLine(map, numbers);
  }, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, { map, numbers }) => {
    return (
      acc +
      processLine(
        [...map, "?", ...map, "?", ...map, "?", ...map, "?", ...map],
        [...numbers, ...numbers, ...numbers, ...numbers, ...numbers]
      )
    );
  }, 0);
};
