export const processInput = (input: string) => {
  let startingPosition: [number, number] = [0, 0];
  const map = input.split("\n").reduce<Record<number, Record<number, string>>>((acc, curr, i) => {
    acc[i] = curr.split("").reduce<Record<number, string>>((acc, curr, j) => {
      acc[j] = curr;
      if (curr === "S") {
        startingPosition = [i, j];
      }
      return acc;
    }, {});
    return acc;
  }, {});
  return { map, startingPosition };
};

const lookArounds: Record<string, number[][]> = {
  "|": [
    [1, 0],
    [-1, 0],
  ],
  J: [
    [-1, 0],
    [0, -1],
  ],
  L: [
    [-1, 0],
    [0, 1],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
  "7": [
    [1, 0],
    [0, -1],
  ],
  S: [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ],
  "-": [
    [0, -1],
    [0, 1],
  ],
};

const print = (map: Record<number, Record<number, string | number>>) => {
  return Object.values(map)
    .map((line) => Object.values(line).join(""))
    .join("\n");
};

export const partOne = ({ map, startingPosition }: ReturnType<typeof processInput>) => {
  const intMap: Record<number, Record<number, string | number>> = JSON.parse(JSON.stringify(map));
  const initialPointer = [startingPosition[0], startingPosition[1]];
  intMap[initialPointer[0]][initialPointer[1]] = 0;

  let pointers = [initialPointer];
  let steps = [0];

  for (let f = 0; f < lookArounds["S"].length; f++) {
    // Top
    if (["|", "7", "F"].includes(map[initialPointer[0] - 1][initialPointer[1]])) {
      pointers.push([initialPointer[0] - 1, initialPointer[1]]);
      steps.push(1);
      intMap[initialPointer[0] - 1][initialPointer[1]] = 1;
    }

    // Left
    if (["-", "F", "L"].includes(map[initialPointer[0]][initialPointer[1] - 1])) {
      pointers.push([initialPointer[0], initialPointer[1] - 1]);
      steps.push(1);
      intMap[initialPointer[0]][initialPointer[1] - 1] = 1;
    }

    // Bottom
    if (["|", "J", "L"].includes(map[initialPointer[0] + 1][initialPointer[1]])) {
      pointers.push([initialPointer[0] + 1, initialPointer[1]]);
      steps.push(1);
      intMap[initialPointer[0] + 1][initialPointer[1]] = 1;
    }

    // Right
    if (["-", "7", "J"].includes(map[initialPointer[0]][initialPointer[1] + 1])) {
      pointers.push([initialPointer[0], initialPointer[1] + 1]);
      steps.push(1);
      intMap[initialPointer[0]][initialPointer[1] + 1] = 1;
    }
  }

  for (let j = 1; j < pointers.length; j++) {
    const pointer = pointers[j];
    const current = map[pointer[0]][pointer[1]];
    const lookAround = lookArounds[current];
    // console.log(pointer);
    // console.log(current);
    // console.log(lookAround);

    for (let i = 0; i < lookAround.length; i++) {
      let [dx, dy] = lookAround[i];
      let newPointer = [pointer[0] + dx, pointer[1] + dy];
      let next = map[newPointer[0]][newPointer[1]];
      let nextStep = intMap[newPointer[0]][newPointer[1]];
      if (typeof nextStep === "number" && nextStep < steps[j] + 1) {
        continue;
      }

      if (!next || next === ".") {
        continue;
      }

      pointers.push(newPointer);
      steps.push(steps[j] + 1);
      intMap[newPointer[0]][newPointer[1]] = steps[j] + 1;
    }
    // console.log(print(intMap));
  }

  return Math.max(
    ...Object.values(intMap)
      .reduce<number[]>(
        (acc, curr) => [
          ...acc,
          ...Object.values(curr).reduce<number[]>((acc, curr) => (typeof curr === "number" ? [...acc, curr] : acc), []),
        ],
        []
      )
      .flat()
  );
};

export const partTwo = (input: ReturnType<typeof processInput>) => {};
