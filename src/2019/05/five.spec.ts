import { partOne, partTwo } from "./five";
import { getFile } from "../../utils/getInput";
import { IntCode } from "../02/two";

const PUZZLE_INPUT = getFile(__dirname, 'input.txt');

describe('Part One', () => {
  it('returns return for 1002,4,3,4,33', () => {
    expect(IntCode('1002,4,3,4,33')).toBeTruthy();
  })
  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(15259545);
  });
});

describe('Part Two', () => {
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(7616021);
  });
});
