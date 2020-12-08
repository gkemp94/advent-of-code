export const processInput = (input: string): string[][] => {
  return input.split('\n').map(x => x.split(' '));
};

const runProgram = (input: string[][]) => {
  const runOperations = new Set();
  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    if (runOperations.has(i)) {
      return { acc, isNotInfinite: false };
    }
    runOperations.add(i);
    switch(input[i][0]) {
      case 'nop':
        continue;
      case 'acc':
        acc = acc + parseInt(input[i][1]);
        continue;
      case 'jmp':
        i = i + parseInt(input[i][1]) - 1;
        continue;
    }
  }
  return { acc, isNotInfinite: true };
}

export const partOne = (input: string[][]) => {
  return runProgram(input).acc;
};

export const partTwo = (input: string[][]) => {
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === 'jmp') {
      const newArray = [...input.map(x => [...x])];
      newArray[i][0] = 'nop';
      const { acc, isNotInfinite } = runProgram(newArray);
      if (isNotInfinite) {
        return acc;
      }
    } else if (input[i][0] === 'nop') {
      const newArray = [...input.map(x => [...x])];
      newArray[i][0] = 'jmp';
      const { acc, isNotInfinite } = runProgram(newArray);
      if (isNotInfinite) {
        return acc;
      }
    }
  }
};
