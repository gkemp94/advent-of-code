export const processInput = (input: string): Record<string, { item: string, amount: number | null }[]> => {
  return input.split('\n').reduce((curr: Record<string, { item: string, amount: number | null }[]>, row) => {
    const [key, contents] = row.split(/ contains? /);
    curr[key.replace(/bags?/g, '').trim()] = contents.split(',').map(x => {
      const match = x.match(/[0-9]+/g);
      const amount = match && parseInt(match[0]);
      return { item: x.replace(/[0-9\.]+/g, '').replace(/bags?/, '').trim(), amount }
    });
    return curr;
  }, {});
};

export const partOne = (input: Record<string,{ item: string, amount: number | null }[]>) => {
  const adjustedInput = Object.keys(input).reduce((curr: Record<string, string[]>, item) => {
    curr[item] = input[item].map(({ item }) => item);
    return curr;
  }, {});
  const containingBags = ['shiny gold'];
  const keys = Object.keys(input);
  for (let i = 0; i < containingBags.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (adjustedInput[keys[j]].includes(containingBags[i]) && !containingBags.includes(keys[j])) {
        containingBags.push(keys[j]);
      }
    }
  }
  return containingBags.length - 1;
};

export const partTwo = (input: Record<string, { item: string, amount: number | null }[]>) => {
  const containingBags = ['shiny gold'];
  for (let i = 0; i < containingBags.length; i++) {
    const key = containingBags[i];
    input[key].forEach(({ item , amount }) => {
      if (!amount) return;
      for (let k = 0; k < amount; k++) {
        containingBags.push(item);
      }
    })
  }
  return containingBags.length - 1;
};
