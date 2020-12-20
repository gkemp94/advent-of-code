import { partOne, partTwo, processInput } from "./fourteen";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const SAMPLE_INPUT_2 = processInput(getFile(__dirname, 'sample_2.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

xdescribe('Part One', () => {
  it('returns 165 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(165);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(7611244640053);
  });
});

describe('Part Two', () => {
  it('returns 1068781 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT_2)).toBe(208);
  });

  it('returns correct result for puzzle input', () => {
    const result = partTwo(PUZZLE_INPUT);
    expect(result).toBe(3705162613854);
  });
});
