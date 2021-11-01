import { partOne, partTwo, processInput } from "./nine";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 127 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT, 5)).toBe(127);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT, 25)).toBe(88311122);
  });
});

describe('Part Two', () => {
    it('returns 62 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT, 5)).toBe(62);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT, 25)).toBe(13549369);
  });
});


