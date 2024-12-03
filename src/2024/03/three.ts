const regex = /(mul)\(([0-9]{1,3}),([0-9]{1,3})\)|do\(\)|don't\(\)/g;
export const processInput = (input: string) => {
  let enabled = true;
  const result: [number, number, boolean][] = [];
  [...input.matchAll(regex)].forEach((match) => {
    if (match[0] === "do()") {
      enabled = true;
    } else if (match[0] === "don't()") {
      enabled = false;
    } else {
      result.push([Number(match[2]), Number(match[3]), enabled]);
    }
  });
  return result;
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, curr) => {
    return acc + curr[0] * curr[1];
  }, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, curr) => {
    return curr[2] ? acc + curr[0] * curr[1] : acc;
  }, 0);
};
