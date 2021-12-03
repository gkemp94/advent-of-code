export const processInput = (input: string): number[][] => {
  return input.split('\n').map(x => x.split('').map(y => Number(y)));
};

const getCommonBits = (input: number[][]) => {
  const most = input
    .reduce((acc, row) => acc.map((x, i) => x + row[i]), new Array(input[0].length).fill(0))
    .map(x => Math.round(x / input.length));
  
  const least = most.map(x => Math.abs(x - 1));
  return { most, least };
}

export const partOne = (input: number[][]) => {
  const { most, least } = getCommonBits(input);

  const gamma = parseInt(most.join(''), 2);
  const epsilon = parseInt(least.join(''), 2);

  return gamma * epsilon;
};

export const partTwo = (input: number[][]) => {
  let o2 = input;
  let co2 = input;
  
  let i = 0;
  while (o2.length > 1) {
    const { most } = getCommonBits(o2);
    o2 = o2.filter(row => row[i] === most[i]);
    i++;
  }

  let j = 0;
  while(co2.length > 1) {
    const { least } = getCommonBits(co2);
    co2 = co2.filter(row => row[j] === least[j]);
    j++;
  }

  return parseInt(o2[0].join(''), 2) * parseInt(co2[0].join(''), 2);
};
