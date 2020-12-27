import { partOne, partTwo, processInput } from "./twentytwo";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 306 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(306);
  });

  it('returns correct result for puzzle input', () => {
    const result = partOne(PUZZLE_INPUT);
    expect(result).toBe(30197);
  });

});

describe('Part Two', () => {
  it('returns 291 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(291);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(34031);
  });

});

