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

export const getAllAddresses = (addressBin: string[], mask: string[]): string[][] => {
  const result: string[] = [];
  for (let i = 0; i < addressBin.length; i++) {
    if (mask[i] === '1') {
      result[i] = mask[i];
    } else if (mask[i] === 'X') {
      return getAllAddresses(addressBin.slice(i + 1, addressBin.length), mask.slice(i + 1, mask.length)).reduce<string[][]>((prev, x) => {
         prev.push([...result, '1', ...x]);
         prev.push([...result, '0', ...x]);
         return prev;
      }, []);
    } else {
      result.push(addressBin[i]);
    }
  }
  return [result];
}

export const partTwo = (input: string[][]) => {
  const NUM_REGEX = /[0-9]+/;
  const mem: Record<number, number> = {};
  let currMask: string[];
  for (let i = 0; i < input.length; i++) {
    if (input[i][0] === 'mask') {
      currMask = input[i][1].padStart(36, "0").split('');
    } else {
      const address = parseInt(input[i][0].match(NUM_REGEX)![0]);
      const addressBin = address.toString(2).padStart(36, "0").split('');
      const allAddresses = getAllAddresses(addressBin, currMask!).map(x => parseInt(x.join(''), 2));
      allAddresses.forEach(address => {
        mem[address] = parseInt(input[i][1]);
      });
    }
  }
  return Object.keys(mem).reduce((prev: number, curr: string) => prev + mem[curr as any], 0);
};