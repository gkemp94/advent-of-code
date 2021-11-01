import { partOne, partTwo, processInput } from "./three";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'))
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 7 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(7);
  });
  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(214);
  });
});

describe('Part Two', () => {
  it('returns 336 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(336);
  });
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(8336352024);
  });
});

