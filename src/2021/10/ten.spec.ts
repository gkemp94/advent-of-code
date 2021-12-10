import { partOne, partTwo, processInput } from "./10";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 26397 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(26397);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(362271);
  });
});

describe('Part Two', () => {
  it('returns 288957 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(288957);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(1698395182);
  });
});


