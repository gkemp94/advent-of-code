
const get = (memory: number[], index: number, mode: number = 0) => {
  return mode === 0 ? memory[memory[index]] : memory[index];
}

export function IntCode(program: string, noun?: number, verb?: number, input = 1) {
  let pointer = 0;
  const memory = program.split(',').map(Number);
  memory[1] = noun || memory[1];
  memory[2] = verb || memory[2];
  let output;
  while(true) {
    const instructionStr = memory[pointer].toString();
    const opCode = Number(instructionStr.substr(-2));
    const modes = instructionStr.substr(0, instructionStr.length - 2).split('').map(Number).reverse();
    switch (opCode) {
      case 1: {
        const input1 = get(memory, pointer + 1, modes[0]);
        const input2 = get(memory, pointer + 2, modes[1]);
        memory[memory[pointer + 3]] = input1 + input2;
        pointer += 4;
        break;
      }
      case 2: {
        const input1 = get(memory, pointer + 1, modes[0]);
        const input2 = get(memory, pointer + 2, modes[1]);
        memory[memory[pointer + 3]] = input1 * input2;
        pointer += 4;
        break; 
      }
      case 3: {
        memory[memory[pointer + 1]] = input;
        pointer += 2;
        break;
      }
      case 4: {
        output = get(memory, pointer + 1, modes[0]);
        pointer += 2;
        break;
      }
      case 5: {
        const input1 = get(memory, pointer + 1, modes[0]);
        const input2 = get(memory, pointer + 2, modes[1]);
        if (input1 !== 0) {
          pointer = input2;
        } else {
          pointer += 3;
        }
        break;
      }
      case 6: {
        const input1 = get(memory, pointer + 1, modes[0]);
        const input2 = get(memory, pointer + 2, modes[1]);
        if (input1 === 0) {
          pointer = input2;
        } else {
          pointer += 3;
        }
        break;
      }
      case 7: {
        const input1 = get(memory, pointer + 1, modes[0]);
        const input2 = get(memory, pointer + 2, modes[1]);
        memory[memory[pointer + 3]] = input1 < input2 ? 1 : 0;
        pointer += 4
        break;
      }
      case 8: {
        const input1 = get(memory, pointer + 1, modes[0]);
        const input2 = get(memory, pointer + 2, modes[1]);
        memory[memory[pointer + 3]] = input1 === input2 ? 1 : 0;
        pointer += 4
        break;
      }
      case 99: {
        return { memory, output };
      }
      default: {
        throw new Error(`Unknown opcode ${opCode}`);
      }
    }
  }
}

export const partOne = (input: string, noun = 12, verb = 2) => {
  return IntCode(input, noun, verb).memory[0]
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
