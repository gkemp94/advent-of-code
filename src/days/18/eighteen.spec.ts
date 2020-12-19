import { partOne, partTwo, processInput } from "./eighteen";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2');
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 13632 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(13632);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(2743012121210);
  });
});

describe('Part Two', () => {
  it('returns 23340 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(23340);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(65658760783597);
  });

});

