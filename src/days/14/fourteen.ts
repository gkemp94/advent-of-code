export const processInput = (input: string): string[][] => {
  return input.split('\n').map(x => {
    return x.split(' = ');
  })
};

const applyMask = (value: number, mask?: number[]) => {
  if (!mask) return value;
  const binary = value.toString(2).padStart(36, "0").split('').map(x => parseInt(x)).map((x, i) => {
    return !Number.isNaN(mask[i]) ? mask[i] : x;
  }).join('');
  return parseInt(binary, 2);
}

export const partOne = (input: string[][]) => {
  const NUM_REGEX = /[0-9]+/;
  const mem: Record<number, number> = {};
  let currMask;
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === 'mask') {
      currMask = input[i][1].split('').map(x => parseInt(x));
    } else {
      const address = parseInt(input[i][0].match(NUM_REGEX)![0]);
      const value = parseInt(input[i][1]);
      const maskedValue = applyMask(value, currMask);
      mem[address] = maskedValue;
    }
  }
  return Object.keys(mem).reduce((prev: number, curr: string) => prev + mem[curr as any], 0);
};

export const partTwo = (input: string[][]) => {
  const NUM_REGEX = /[0-9]+/;
  const mem: Record<number, number> = {};
  let currMask;
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === 'mask') {
      currMask = input[i][1].split('').map(x => parseInt(x));
    } else {
      const address = parseInt(input[i][0].match(NUM_REGEX)![0]);
      const value = parseInt(input[i][1]);
      const maskedValue = applyMask(value, currMask);
      mem[address] = maskedValue;
    }
  }
  return Object.keys(mem).reduce((prev: number, curr: string) => prev + mem[curr as any], 0);
};