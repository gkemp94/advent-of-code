import { IntCode } from "../02/two";

export const partOne = (input: string) => {
  return IntCode(input).output;
};

export const partTwo = (input: string) => {
  return IntCode(input, undefined, undefined, 5).output;
};
