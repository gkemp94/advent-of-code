import { partOne, partTwo, processInput, getPosition } from "./five";
import { getFile } from "../../utils/getInput";

const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 2 for sample input.', () => {
    expect(getPosition('FBFBBFFRLR')[0]).toBe(44);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(822);
  });
});

describe('Part Two', () => {
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(705);
  });
});
