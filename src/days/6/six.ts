export const processInput = (input: string): string[] => {
  return input.split('\n\n');
};

export const getSet = (input: string) => {
  return input
    .replace(/\n/g, '')
    .split('')
    .reduce((curr, y) => {
      curr.add(y);
      return curr;
    }, new Set<string>())
}


export const partOne = (input: string[]) => {
  return input.map(getSet).reduce((curr, i) => curr + i.size, 0);
};

export const partTwo = (input: string[]) => {
  const groupSet = input.map(getSet).map((set) => Array.from(set));
  return input.map((x, i) => {
    const individualSet = x.split('\n').map(getSet);
    return groupSet[i].filter(x => {
      return individualSet.every(y => y.has(x));
    }).length;
  }).reduce((curr, x) => curr + x, 0);
};
