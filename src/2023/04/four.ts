export const processInput = (input: string) => {
  return input.split("\n").map((line) => {
    const [_, digits] = line.split(":");
    const [winners, numbers] = digits.split("|");
    if (line.includes("4 26 44 61")) {
      console.log(winners.split(" "));
    }
    return [
      winners
        .trim()
        .split(" ")
        .filter((x) => x)
        .map((x) => Number(x.trim())),
      numbers
        .trim()
        .split(" ")
        .filter((x) => x)
        .map((x) => Number(x.trim())),
    ];
  });
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, [winners, numbers]) => {
    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (winners.includes(numbers[i])) {
        result = result ? result * 2 : 1;
      }
    }
    return acc + result;
  }, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  const cards: Record<any, number> = { "0": 1 };
  for (let i = 0; i < input.length; i++) {
    if (!cards[i]) {
      cards[i] = 1;
    }
    const [winners, numbers] = input[i];
    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (winners.includes(numbers[i])) {
        result += 1;
      }
    }
    let index = i + 1;
    while (result) {
      if (!cards[index]) {
        cards[index] = 1;
      }
      cards[index] += cards[i];
      result--;
      index++;
    }
  }
  return Object.values(cards).reduce((acc, curr) => acc + curr, 0);
};
