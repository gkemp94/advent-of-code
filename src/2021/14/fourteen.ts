interface Input {
  polymer: string;
  instructions: Record<string, string>;
}
export const processInput = (input: string): Input => {
  const [polymer, rawInstructions] = input.split('\n\n');
  return {
    polymer,
    instructions: rawInstructions.split('\n').reduce((acc: Record<string, string>, curr) => {
      const [pair, insert] = curr.split(' -> ');
      acc[pair] = insert;
      return acc;
    }, {}),
  }
};

const run = (input: string, instructions: Record<string, string>, steps = 10) => {
  let letterCount = input.split('').reduce<Record<string, number>>((acc, curr) => ({...acc, [curr]: (acc[curr] || 0) + 1}), {})
  let pairs: Record<string, number> = {};
  for (let i = 0; i < input.length - 1; i++) {
    const pair = `${input[i]}${input[i+1]}`;
    pairs[pair] = (pairs[pair] || 0) + 1;
  }

  for (let i = 0; i < steps; i++) {
    const newPairs = JSON.parse(JSON.stringify(pairs));
    for (const pair in instructions) {
      const insert = instructions[pair];
      if (!pairs[pair]) continue;
      newPairs[`${insert}${pair[1]}`] = (newPairs[`${insert}${pair[1]}`] || 0) + pairs[pair];
      newPairs[`${pair[0]}${insert}`] = (newPairs[`${pair[0]}${insert}`] || 0) + pairs[pair];
      newPairs[pair] = newPairs[pair] - pairs[pair]
      letterCount[insert] = (letterCount[insert] || 0) + pairs[pair]
    }
    pairs = newPairs;
  }
  const counts = Object.values(letterCount);
  return Math.max(...counts) - Math.min(...counts);
};

export const partOne = ({ polymer, instructions }: Input) => run(polymer, instructions);
export const partTwo = ({ polymer, instructions }: Input) => run(polymer, instructions, 40);
