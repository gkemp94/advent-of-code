import { partOne, partTwo, processInput } from "./10";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const SAMPLE_INPUT_2 = processInput(getFile(__dirname, 'sample_2.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 35 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(35);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(1656);
  });
});

describe('Part Two', () => {
  it('returns 8 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(8);
  });

  it('returns 19208 for sample input 2.', () => {
    expect(partTwo(SAMPLE_INPUT_2)).toBe(19208)
  })

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(56693912375296);
  });
});


