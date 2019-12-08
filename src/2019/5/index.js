import IntCodeComputer from "../../utils/IntCode";

export const partOne = (input) => {
  const program = input.split(',').map(Number);
  const computer = new IntCodeComputer(program);
  computer.addInputs([1]);
  computer.run();
  const { outputs } = computer;
  return outputs[outputs.length-1];
}

export const partTwo = (input) => {
  const program = input.split(',').map(Number);
  const computer = new IntCodeComputer(program);
  computer.addInputs([5]);
  computer.run();
  const { outputs } = computer;
  return outputs[outputs.length-1];
}