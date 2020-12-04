import { partOne, partTwo, processInput } from "./four";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT_1 = processInput(getFile(__dirname, 'sample_1.txt'))
const SAMPLE_INPUT_2 = processInput(getFile(__dirname, 'sample_2.txt'))
const SAMPLE_INPUT_3 = processInput(getFile(__dirname, 'sample_3.txt'))
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 2 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT_1)).toBe(2);
  });
  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(233);
  });
});

describe('Part Two', () => {
  it('returns 0 for invalid  input.', () => {
    expect(partTwo(SAMPLE_INPUT_2)).toBe(0);
  });
  it('returns all as valid inputs', () => {
    expect(partTwo(SAMPLE_INPUT_3)).toBe(SAMPLE_INPUT_3.length);
  })
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(111);
  });
});

