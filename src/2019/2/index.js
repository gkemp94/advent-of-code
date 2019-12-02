export const runProgram = (input) => {
  const program = input.split(',').map(Number);
  for (let i = 0; i < program.length; i = i+4) {
    const opCode = program[i];
    switch(opCode) {
      case 1:
        program[program[i+3]] = program[program[i+1]] + program[program[i+2]]
        break;
      case 2:
        program[program[i+3]] = program[program[i+1]] * program[program[i+2]]
        break;
      case 99:
        return program.join(',');
      default:
        throw new Error('Unknown Op Code');
    }
  }
  return program.join(',');
}

export const partOne = (input, noun = 12, verb = 2) => {
  const modifiedInput = input.split(',');
  modifiedInput[1] = noun;
  modifiedInput[2] = verb;
  return runProgram(modifiedInput.join(',')).split(',')[0];
}

export const partTwo = (input) => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      if (partOne(input, noun, verb) === "19690720") {
        return (100 * noun) + verb;
      }
    }
  }
}