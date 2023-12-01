const NUMBER_WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export const processInput = (input: string) => {
  return input.split("\n").map((line) => {
    const numbers = [];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (Number(char)) {
        numbers.push(char);
      } else {
        for (let j = 0; j < NUMBER_WORDS.length; j++) {
          const word = NUMBER_WORDS[j];
          const potentialWord = line.slice(i, i + word.length);
          if (potentialWord === word) {
            numbers.push(word);
            break;
          }
        }
      }
    }
    return numbers;
  });
};

export const partOne = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, line) => {
    const digits = line.map(Number).filter((x) => x);
    return acc + Number(`${digits[0]}${digits[digits.length - 1]}`);
  }, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, line, i) => {
    const numbers = line.map((match) =>
      NUMBER_WORDS.includes(match) ? NUMBER_WORDS.indexOf(match) + 1 : Number(match)
    );
    return acc + Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
  }, 0);
};
