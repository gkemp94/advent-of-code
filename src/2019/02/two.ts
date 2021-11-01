
export function IntCode(input: string, noun?: number, verb?: number) {
  let pointer = 0;
  const memory = input.split(',').map(x => parseInt(x));
  memory[1] = noun || memory[1];
  memory[2] = verb || memory[2];
  while(true) {
    const instruction = memory[pointer];
    switch (instruction) {
      case 1: {
        const params = memory.slice(pointer + 1, pointer + 4);
        memory[params[2]] = memory[params[0]] + memory[params[1]];
        pointer += 4;
        break;
      }
      case 2: {
        const params = memory.slice(pointer + 1, pointer + 4);
        memory[params[2]] = memory[params[0]] * memory[params[1]];
        pointer += 4;
        break;
      }
      case 99: {
        return memory;
      }
      default: {
        throw new Error(`Unknown opcode ${instruction}`);
      }
    }
  }
}

export const partOne = (input: string, noun = 12, verb = 2) => {
  return IntCode(input, noun, verb)[0]
};

export const partTwo = (input: string) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      if (partOne(input, noun, verb) === 19690720) {
        return 100 * noun + verb;
      }
    } 
  }
};
