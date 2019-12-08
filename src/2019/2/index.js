import IntCode from '../../utils/IntCode';

export const partOne = (input, noun = 12, verb = 2) => {
  const program = input.split(',').map(Number);
  program[1] = noun;
  program[2] = verb;
  const computer = new IntCode(program);
  computer.run();
  return computer.program[0];
}

export const partTwo = (input) => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      if (partOne(input, noun, verb) === 19690720) {
        return (100 * noun) + verb;
      }
    }
  }
}