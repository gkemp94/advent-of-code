export const processInput = (input: string): number[] => {
  return input.split('\n').map(x => parseInt(x));
};


export const partOne = (input: number[], preambleSize = 5) => {
  const findValidSum = (i: number) => {
    for (let j = i; j >= i - preambleSize; j--) {
      for (let k = j; k >= i - preambleSize; k--) {
        if (input[j] + input[k] === input[i]) return true;
      }
    }
  }

  for (let i = preambleSize; i < input.length; i++) {
    if(!findValidSum(i)) return input[i];
  };
}

export const partTwo = (input: number[], preambleSize = 5) => {
  const targetSum = partOne(input, preambleSize)!;
  for (let i = 0; i < input.length; i++) {
    let currentSum = 0;
    let items = [];

    for (let j = i; j < input.length && currentSum < targetSum; j++) {
      currentSum += input[j];
      items.push(input[j]);
    }
    if (items.length > 1 && currentSum === targetSum) {
      return Math.min(...items) + Math.max(...items);
    }
  }
};
