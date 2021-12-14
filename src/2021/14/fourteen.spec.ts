import { partOne, partTwo, processInput } from "./fourteen";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 165 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(1588);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(2768);
  });
});

describe('Part Two', () => {
  it('returns 1068781 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(2188189693529);
  });

  it('returns correct result for puzzle input', () => {
    const result = partTwo(PUZZLE_INPUT);
    expect(result).toBe(2914365137499);
  });
});
