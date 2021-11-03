enum Mode {
  position = 0,
  immediate = 1,
  relative = 2,
}

const get = (memory: number[], index: number, mode: Mode = Mode.position, relativeBase: number, debug = false) => {
  if (mode === Mode.position) {
    return memory[memory[index]] || 0;
  } else if (mode === Mode.immediate) {
    return memory[index] || 0;
  } else if (mode === Mode.relative) {
    return memory[memory[index] + relativeBase] || 0;
  } else {
    throw new Error('Unknown Mode');
  }
}

const set = (memory: number[], index: number, value: number, mode: Mode = Mode.position, relativeBase: number) => {
  const location = mode === Mode.position ? memory[index] || 0 : memory[index] + relativeBase || 0;
  while (memory.length < location) {
    memory.push(0);
  }
  memory[location] = value;
}

export function IntCode(program: string, noun?: number, verb?: number, input = 1, debug: boolean = false) {
  let pointer = 0;
  let relativeBase = 0;
  const memory = program.split(',').map(Number);
  memory[1] = noun || memory[1];
  memory[2] = verb || memory[2];
  const output = [];
  while(true) {
    const instructionStr = memory[pointer].toString();
    const opCode = Number(instructionStr.substr(-2));
    const modes = instructionStr.substr(0, instructionStr.length - 2).split('').map(Number).reverse();
    switch (opCode) {
      case 1: {
        const input1 = get(memory, pointer + 1, modes[0], relativeBase, true);
        const input2 = get(memory, pointer + 2, modes[1], relativeBase, true);
        set(memory, pointer + 3, input1 + input2, modes[2], relativeBase);
        pointer += 4;
        break;
      }
      case 2: {
        const input1 = get(memory, pointer + 1, modes[0], relativeBase);
        const input2 = get(memory, pointer + 2, modes[1], relativeBase);
        set(memory, pointer + 3, input1 * input2, modes[2], relativeBase);
        pointer += 4;
        break; 
      }
      case 3: {
        set(memory, pointer + 1, input, modes[0], relativeBase);
        pointer += 2;
        break;
      }
      case 4: {
        output.push(get(memory, pointer + 1, modes[0], relativeBase));
        pointer += 2;
        break;
      }
      case 5: {
        const input1 = get(memory, pointer + 1, modes[0], relativeBase);
        const input2 = get(memory, pointer + 2, modes[1], relativeBase);
        if (input1 !== 0) {
          pointer = input2;
        } else {
          pointer += 3;
        }
        break;
      }
      case 6: {
        const input1 = get(memory, pointer + 1, modes[0], relativeBase);
        const input2 = get(memory, pointer + 2, modes[1], relativeBase);
        if (input1 === 0) {
          pointer = input2;
        } else {
          pointer += 3;
        }
        break;
      }
      case 7: {
        const input1 = get(memory, pointer + 1, modes[0], relativeBase);
        const input2 = get(memory, pointer + 2, modes[1], relativeBase);
        set(memory, pointer + 3, input1 < input2 ? 1 : 0, modes[2], relativeBase);
        pointer += 4
        break;
      }
      case 8: {
        const input1 = get(memory, pointer + 1, modes[0], relativeBase);
        const input2 = get(memory, pointer + 2, modes[1], relativeBase);
        set(memory, pointer + 3, input1 === input2 ? 1 : 0, modes[2], relativeBase);
        pointer += 4
        break;
      }
      case 9: {
        const input1 = get(memory, pointer + 1, modes[0], relativeBase);
        relativeBase += input1;
        pointer += 2;
        break;
      }
      case 99: {
        return { memory, output: output.length > 1 ? output : output[0] };
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
