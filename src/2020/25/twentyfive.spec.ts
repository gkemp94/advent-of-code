import { getFile } from "../../utils/getInput";
import { partOne, partTwo, processInput } from "./twentyfive";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 14897079 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(14897079);
  });

  it('returns correct result for puzzle input', () => {
    const result = partOne(PUZZLE_INPUT);
    expect(result).toBe(8329514);
  });
});

xdescribe('Part Two', () => {
  xit('returns 2208 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(2208);
  });

  xit('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(4150);
  });
});

