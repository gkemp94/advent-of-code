import { partOne, partTwo, processInput } from "./one";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'))
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 7 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(7);
  });
  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(1692);
  });
});

describe('Part Two', () => {
  it('returns 5 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(5);
  });
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(1724);
  });
});
