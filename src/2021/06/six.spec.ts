import { partOne, partTwo, processInput } from "./six";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 5934 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(5934);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(372300);
  });
});


describe('Part Two', () => {
    it('returns 6 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(26984457539);
  });
  
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(1675781200288);
  });
});

