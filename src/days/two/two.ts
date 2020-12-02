interface IEntry {
  varA: number;
  varB: number;
  char: string;
  pass: string;
}
export const processInput = (input: string): IEntry[] => {
  return input.split('\n').map(x => {
    const [policy, pass] = x.split(':');
    const [counts, char] = policy.split(' ');
    const [varA, varB] = counts.split('-').map(x => parseInt(x));
    return { varA, varB, char, pass}
  });
};

export const partOne = (input: IEntry[]) => {
  return input.reduce((curr, x) => {
    const charCount = x.pass.replace(new RegExp(`[^${x.char}]`, 'g'), '').length;
    return charCount >= x.varA && charCount <= x.varB ? curr + 1 : curr;
  }, 0);
};

export const partTwo = (input: IEntry[]) => {
  return input.reduce((curr, x) => {
    const passArray = x.pass.split('');
    if (passArray[x.varA] === x.char && passArray[x.varB] !== x.char) {
      return curr + 1;
    } else if (passArray[x.varA] !== x.char && passArray[x.varB] === x.char) {
      return curr + 1;
    }
    return curr;
  }, 0);
};
