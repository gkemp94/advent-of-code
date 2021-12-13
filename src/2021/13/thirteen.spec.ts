import { partOne, partTwo, processInput } from "./thirteen";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));
const PART_TWO_ANS = getFile(__dirname, 'answer.txt');

describe('Part One', () => {
  it('returns 17 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(17);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(693);
  });
});

describe('Part Two', () => {

  it('returns correct result for puzzle input', () => {
    const result = partTwo(PUZZLE_INPUT);
    expect(result).toBe(PART_TWO_ANS);
  });
});
