import { partOne, partTwo } from "./nine";
import { getFile } from "../../utils/getInput";
import { IntCode } from "../02/two";

const PUZZLE_INPUT = getFile(__dirname, 'input.txt');

describe('Part One', () => {
  it('should handle extending memory', () => {
    expect((IntCode('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99').output as number[]).join(',')).toBe('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99');
  });
  it('should return 16-digit number as output', () => {
    expect(IntCode('1102,34915192,34915192,7,4,7,99,0').output?.toString()).toHaveLength(16);
  })
  it('should return large number as output', () => {
    expect(IntCode('104,1125899906842624,99').output).toEqual(1125899906842624);
  })
  it('returns correct result for puzzle input', () => {
    const result = partOne(PUZZLE_INPUT)
    expect(result).toBeGreaterThan(203);
    expect(result).toBe(3409270027);
  });
});

describe('Part Two', () => {
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(82760);
  });
});
