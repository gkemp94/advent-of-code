import { partOne, partTwo, processInput } from "./twentyone";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 5 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(5);
  });

  it('returns correct result for puzzle input', () => {
    const result = partOne(PUZZLE_INPUT);
    expect(result).toBeLessThan(2548);
    expect(result).toBeGreaterThan(1360);
    expect(result).toBe(2203);
  });

});

describe('Part Two', () => {
  it('returns mxmxvkd,sqjhc,fvjkl for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe("mxmxvkd,sqjhc,fvjkl");
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe("fqfm,kxjttzg,ldm,mnzbc,zjmdst,ndvrq,fkjmz,kjkrm");
  });
});

