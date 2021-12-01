import { IntCode } from "../02/two";

export const partOne = (input: string) => {
  const output = IntCode(input).output as number[];
  return output[output.length - 1];
};

export const partTwo = (input: string) => {
  return IntCode(input, undefined, undefined, 5).output;
};
