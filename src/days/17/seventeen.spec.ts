import { partOne, partTwo, processInput } from "./seventeen";
import { getFile } from "../../utils/getInput";

describe('Part One', () => {
  const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
  const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

  it('returns 112 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(112);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(273);
  });

});

describe('Part Two', () => {
  const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'), 4);
  const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'), 4);
  
  it('returns 848 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(848);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(1504);
  });
});

