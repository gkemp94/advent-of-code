export const processInput = (input: string) =>
  input.split("\n").reduce<[number[], number[]]>(
    (acc, curr) => {
      const [a, b] = curr.split("   ");
      acc[0].push(Number(a));
      acc[1].push(Number(b));
      return acc;
    },
    [[], []]
  );

export const partOne = ([listOne, listTwo]: ReturnType<typeof processInput>) => {
  const a = listOne.sort();
  const b = listTwo.sort();
  return a.reduce((acc, _, index) => acc + Math.abs(a[index] - b[index]), 0);
};

export const partTwo = ([listOne, listTwo]: ReturnType<typeof processInput>) => {
  const map = listTwo.reduce<Record<number, number>>((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {});

  return listOne.reduce((acc, curr) => {
    return acc + curr * (map[curr] || 0);
  }, 0);
};
