import { partOne, partTwo, processInput } from "./twentythree";

const SAMPLE_INPUT = processInput('389125467');
const PUZZLE_INPUT = processInput('219748365');

describe('Part One', () => {
  it('returns 67384529 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(67384529);
  });

  it('returns correct result for puzzle input', () => {
    const result = partOne(PUZZLE_INPUT);
    expect(result).toBe(35827964);
  });
});

describe('Part Two', () => {
  it('returns 149245887792 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(149245887792);
  });

  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(5403610688);
  });
});

