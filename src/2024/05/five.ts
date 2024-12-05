export const processInput = (input: string) => {
  const [ordering, lists] = input.split("\n\n");
  return [
    ordering.split("\n").map((line) => line.split("|").map(Number)),
    lists.split("\n").map((line) => line.split(",").map(Number)),
  ];
};

export const partOne = ([ordering, lists]: ReturnType<typeof processInput>) => {
  const accurateLists = lists.filter((list) =>
    ordering.every(([a, b]) => list.indexOf(a) === -1 || list.indexOf(b) === -1 || list.indexOf(a) < list.indexOf(b))
  );

  return accurateLists.reduce((acc, curr) => acc + curr[Math.floor((curr.length - 1) / 2)], 0);
};

export const partTwo = ([ordering, lists]: ReturnType<typeof processInput>) => {
  const inaccurateLists = lists.filter((list) =>
    ordering.some(([a, b]) => !(list.indexOf(a) === -1 || list.indexOf(b) === -1 || list.indexOf(a) < list.indexOf(b)))
  );

  return inaccurateLists
    .map((list) => {
      const mod = [...list];
      let isDirty = true;
      while (isDirty) {
        isDirty = false;
        ordering.forEach(([a, b]) => {
          if (mod.includes(a) && mod.includes(b)) {
            if (mod.indexOf(a) > mod.indexOf(b)) {
              isDirty = true;
              mod.splice(mod.indexOf(b), 0, mod.splice(mod.indexOf(a), 1)[0]);
            }
          }
        });
      }
      return mod;
    })
    .reduce((acc, curr) => acc + curr[Math.floor((curr.length - 1) / 2)], 0);
};
