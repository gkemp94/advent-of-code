import { partOne, partTwo, processInput } from "./twelve";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 10 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(10);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(5076);
  });

});

describe('Part Two', () => {
  it('returns 36 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(36);
  });


  it('returns correct result for puzzle input', () => {
    const result = partTwo(PUZZLE_INPUT);
    expect(result).toBe(145643);
  });
});
