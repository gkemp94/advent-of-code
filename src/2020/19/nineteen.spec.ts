import { partOne, partTwo, processInput } from "./nineteen";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 3 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(3);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(178);
  });
});

describe('Part Two', () => {
  it('returns 12 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(12);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(346);
  });
});

