import { getFile } from "../../utils/getInput";
import { partOne, partTwo, processInput } from "./twentyfour";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 10 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(10);
  });

  it('returns correct result for puzzle input', () => {
    const result = partOne(PUZZLE_INPUT);
    expect(result).toBe(459);
  });
});

describe('Part Two', () => {
  it('returns 2208 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(2208);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(4150);
  });
});

