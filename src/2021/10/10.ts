export const processInput = (input: string): string[][] => {
  return input.split("\n").map((x) => x.split(""));
};

const pairs: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const pairValues: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const openingPairs = Object.keys(pairs);
const closingPairs = Object.values(pairs);

const getIsCorrupted = (row: string[]) => {
  let stack = [];
  for (let i = 0; i < row.length; i++) {
    if (openingPairs.includes(row[i])) {
      stack.push(row[i]);
    } else if (closingPairs.includes(row[i])) {
      if (pairs[stack[stack.length - 1]] === row[i]) {
        stack.pop();
      } else {
        return { corrupted: true, value: pairValues[row[i]], stack }
      }
    }
  }
  return { corrupted: false, value: 0, stack }
}

export const partOne = (input: string[][]) => {
  return input.reduce((acc, curr) => acc + getIsCorrupted(curr).value, 0);
};

export const partTwo = (input: string[][]) => {
  const sums: number[] = [];
  const incompleteLines = input.map((curr) => getIsCorrupted(curr)).filter(({ corrupted }) => !corrupted);
  for (let line of incompleteLines) {
    let sum = 0;
    while (line.stack.length) {
      const closingTag = pairs[line.stack.pop()!];
      sum = (sum * 5) + closingPairs.indexOf(closingTag) + 1;
    }
    sums.push(sum)
  }
  return sums.sort((a, b) => a-b)[(sums.length - 1) / 2];
};
