import { partOne, partTwo, processInput } from "./two";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'))
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 2 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(2);
  });
  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(456);
  });
});

describe('Part Two', () => {
  it('returns 1 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(1);
  });
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(308);
  });
});
