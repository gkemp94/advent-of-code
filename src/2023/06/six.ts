export const processInput = (input: string) => {
  const [a, b] = input.split("\n");
  const [_, ...times] = a.split(" ").filter((x) => x);
  const [__, ...distances] = b.split(" ").filter((x) => x);
  return times.map((time, i) => [Number(time), Number(distances[i])]);
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, [t, d]) => {
    const a = (-t - Math.sqrt(Math.pow(t, 2) - 4 * d)) / -2;
    const b = (-t + Math.sqrt(Math.pow(t, 2) - 4 * d)) / -2;
    return acc * (Math.ceil(a) - Math.floor(b) - 1);
  }, 1);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  const [t, d] = input.reduce(
    ([t0, d0], [t, d]) => {
      return [`${t0}${t}`, `${d0}${d}`];
    },
    ["", ""]
  );
  return partOne([[Number(t), Number(d)]]);
};
