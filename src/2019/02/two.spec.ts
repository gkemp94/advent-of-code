import { IntCode, partOne, partTwo } from "./two";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = getFile(__dirname, 'sample_1.txt');
const PUZZLE_INPUT = getFile(__dirname, 'input.txt');

describe('Part One', () => {
  it('returns 3500 for sample input.', () => {
    expect(IntCode(SAMPLE_INPUT)[0]).toBe(3500);
  });
  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(4570637);
  });
});

describe('Part Two', () => {
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(5485);
  });
});
