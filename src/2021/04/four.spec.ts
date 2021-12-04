import { partOne, partTwo, processInput } from "./four";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 4512 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(4512);
  });
  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(63424);
  });
});

describe('Part Two', () => {
  it('returns 1924 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(1924);
  });
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(23541);
  });
});

