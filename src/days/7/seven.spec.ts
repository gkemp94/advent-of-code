import { partOne, partTwo, processInput } from "./seven";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 4 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(4);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(337);
  });
});

describe('Part Two', () => {
    it('returns 32 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(32);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(50100);
  });
});

