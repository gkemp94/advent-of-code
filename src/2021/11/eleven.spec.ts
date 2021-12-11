import { partOne, partTwo, processInput } from "./eleven";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 1656 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(1656);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(1694);
  });

});

describe('Part Two', () => {
  it('returns 26 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(195);
  });


  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(346);
  });
});
