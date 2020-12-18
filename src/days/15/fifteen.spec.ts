import { partOne, partTwo, processInput } from "./fifteen";

const SAMPLE_INPUT = processInput('0,3,6');
const PUZZLE_INPUT = processInput('11,0,1,10,5,19');

describe('Part One', () => {
  it('returns 436 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT, 2020)).toBe(436);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT, 2020)).toBe(870);
  });
});

describe('Part Two', () => {
  it('returns 175594 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT, 30000000)).toBe(175594);
  });
  
  it('returns correct result for puzzle input', () => {
    const result = partTwo(PUZZLE_INPUT, 30000000);
    expect(result).toBe("807435693182510");
  });
});
