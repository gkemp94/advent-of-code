export const processInput = (input: string): string[][][] => {
  return input.split('\n').map(line => line.split('|').map(x => x.split(' ').filter(d => d).map(y => y.trim())));
};


export const partOne = (input: string[][][]) => {
  return input.reduce((acc, curr) => acc + curr[1].filter(x => [2,3,4, 7].includes(x.length)).length, 0);
};

const get = (pattern: string[], func: (str: string) => boolean) => pattern.splice(pattern.findIndex(func), 1)[0];
const intersectStr = (a: string, b: string) => a.split('').filter(value => b.split('').includes(value));
const find = (signal: string, signalMap: Record<string, string>) => Object.keys(signalMap).find(key => signalMap[key].length === signal.length && intersectStr(signalMap[key], signal).length === signal.length);

export const partTwo = (input: string[][][]) => {
  let sum = 0;
  for (let row of input) {
    const signalMap: Record<string, string> = {};
    const [pattern, signal] = row;
    signalMap[1] = get(pattern, val => val.length === 2);
    signalMap[4] = get(pattern, val => val.length === 4);
    signalMap[7] = get(pattern, val => val.length === 3);
    signalMap[8] = get(pattern, val => val.length === 7);
    signalMap[6] = get(pattern, val => val.length === 6 && intersectStr(val, signalMap[1]).length === 1);
    signalMap[3] = get(pattern, val => val.length === 5 && intersectStr(val, signalMap[1]).length === 2);
    signalMap[0] = get(pattern, val => {
      return val.length === 6 
        && intersectStr(val, signalMap[8]).length === 6
        && intersectStr(val, signalMap[3]).length === 4;
    })
    signalMap[9] = get(pattern, val => val.length === 6 && intersectStr(val, signalMap[1]).length === 2);
    
    signalMap[5] = get(pattern, val => val.length === 5 && intersectStr(val, signalMap[6]).length === 5);
    signalMap[2] = get(pattern, val => val.length === 5);

    sum += Number(signal.map(signalInput => find(signalInput, signalMap)).join(''));
  }
  return sum;
};