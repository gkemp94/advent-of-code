export const processInput = (input: string) => {
  return input.split("\n").map((x) => x.split(""));
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  const partNumbers: number[] = [];
  const isValid = new Array(input.length).fill([]).map(() => new Array(input[0].length).fill(false));
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const item = input[i][j];
      if (isNaN(Number(item)) && item !== ".") {
        isValid[i - 1][j - 1] = true;
        isValid[i - 1][j] = true;
        isValid[i - 1][j + 1] = true;

        isValid[i][j - 1] = true;
        isValid[i][j + 1] = true;
        isValid[i + 1][j - 1] = true;
        isValid[i + 1][j] = true;
        isValid[i + 1][j + 1] = true;
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let partNumber = "";
      let validPartNumber = false;
      while (!isNaN(Number(input[i][j]))) {
        partNumber += input[i][j];
        validPartNumber = isValid[i][j] || validPartNumber;
        j++;
      }
      if (partNumber && validPartNumber) {
        partNumbers.push(Number(partNumber));
      }
    }
  }

  return partNumbers.reduce((acc, curr) => curr + acc, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  const gears: Record<number, number[]> = {};
  let gearId = 1;
  const isValid = new Array(input.length).fill([]).map(() => new Array(input[0].length).fill(false));
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const item = input[i][j];
      if (item === "*") {
        isValid[i - 1][j - 1] = gearId;
        isValid[i - 1][j] = gearId;
        isValid[i - 1][j + 1] = gearId;

        isValid[i][j - 1] = gearId;
        isValid[i][j + 1] = gearId;
        isValid[i + 1][j - 1] = gearId;
        isValid[i + 1][j] = gearId;
        isValid[i + 1][j + 1] = gearId;
        gearId++;
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let partNumber = "";
      let gearNumber: number | false = false;
      while (!isNaN(Number(input[i][j]))) {
        partNumber += input[i][j];
        gearNumber = isValid[i][j] || gearNumber;
        j++;
      }
      if (partNumber && gearNumber) {
        if (!gears[gearNumber]) {
          gears[gearNumber] = [];
        }
        gears[gearNumber].push(Number(partNumber));
      }
    }
  }

  return Object.keys(gears).reduce((acc, curr) => {
    const grs = gears[Number(curr)];
    if (grs.length === 2) {
      return acc + grs.reduce((acc, curr) => acc * curr, 1);
    }
    return acc;
  }, 0);

  // return partNumbers.reduce((acc, curr) => curr + acc, 0);
};
