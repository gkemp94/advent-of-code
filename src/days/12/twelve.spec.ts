import { partOne, partTwo, processInput } from "./twelve";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 25 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(25);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(1186);
  });

});

describe('Part Two', () => {
  it('returns 286 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(286);
  });


  it('returns correct result for puzzle input', () => {
    const result = partTwo(PUZZLE_INPUT);
    expect(result).toBeLessThan(85176)
    expect(result).toBeGreaterThan(40000);
    expect(result).toBe(47806);
  });
});
