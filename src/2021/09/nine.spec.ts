import { partOne, partTwo, processInput } from "./nine";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 15 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(15);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBeLessThan(1737);
    expect(partOne(PUZZLE_INPUT)).toBe(607);
  });
});

describe('Part Two', () => {
  it('returns 1134 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(1134);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(900864);
  });
});


