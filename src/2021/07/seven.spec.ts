import { partOne, partTwo, processInput } from "./seven";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 37 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(37);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(337833);
  });
});


describe('Part Two', () => {
    it('returns 6 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(168);
  });
  
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(96678050);
  });
});

