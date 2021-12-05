import { partOne, partTwo, processInput } from "./five";
import { getFile } from "../../utils/getInput";

const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));
const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));


describe('Part One', () => {
  it('returns 5 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(5);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(3990);
  });
});

describe('Part Two', () => {
  it('returns correct result for sample input', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(12);
  });
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(705);
  });
});
