const getValue = (program, params, pointer) => {
  return [0, 1].map((x) => program[
    params[x] === 0 
      ? program[pointer + x + 1]
      : pointer + x + 1
  ]);
}

export const runProgram = (program, input) => {
  let i = 0;
  let output = null;
  while (i < program.length) {
    const cmd = `${program[i]}`.padStart(5, '0');
    const opCode = Number(cmd.substr(3));
    const params = cmd.substr(0, 3).split('').reverse().map(Number);
    const [a, b] = getValue(program, params, i);
    switch(opCode) {
      case 1: { // Add
        program[program[i+3]] = a + b;
        i += 4;
        break;
      }
      case 2: { // Multilpy
        program[program[i+3]] = a * b;
        i += 4;
        break;
      }
      case 3: { // Input
        program[program[i+1]] = input;
        i += 2;
        break;
      };
      case 4: { // Output
        output = a;
        i += 2;
        break
      };
      case 5: { // Jump If True
        if (a !== 0) {
          i = b;
          break;
        }
        i += 3
        break;
      }
      case 6: { // Jump If False
        if (a === 0) {
          i = b;
          break;
        }
        i += 3
        break;
      }
      case 7: { // Less Than
        if (a < b) {
          program[program[i+3]] = 1;
        } else {
          program[program[i+3]] = 0;
        }
        i += 4
        break;
      }
      case 8: { // Equal
        if (a === b) {
          program[program[i+3]] = 1;
        } else {
          program[program[i+3]] = 0;
        }
        i += 4
        break;
      }
      case 99:
        return { program, output };
      default:
        throw new Error(`Unknown opCode, ${opCode}`);
    }
  }
  throw new Error('Exceeded Program Value');
}

export const partOne = (input) => {
  const program = input.split(',').map(Number);
  return runProgram(program, 1).output;
}

export const partTwo = (input) => {
  const program = input.split(',').map(Number);
  return runProgram(program, 5).output;
}