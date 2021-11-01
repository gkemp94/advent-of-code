import { partOne, partTwo, processInput } from "./thirteen";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 295 for sample input.', () => {
    expect(partOne(SAMPLE_INPUT)).toBe(295);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(261);
  });
});

describe('Part Two', () => {
  it('returns 1068781 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT[1])).toBe("1068781");
  });

  it('returns 1068781 for sample input.', () => {
    expect(partTwo('17,x,13,19'.split(','))).toBe("3417");
  });

  it('returns 1068781 for sample input.', () => {
    expect(partTwo('67,x,7,59,61'.split(','))).toBe("779210");
  });

  it('returns 1068781 for sample input.', () => {
    expect(partTwo('67,7,x,59,61'.split(','))).toBe("1261476");
  });

  it('returns 1068781 for sample input.', () => {
    expect(partTwo('1789,37,47,1889'.split(','))).toBe("1202161486");
  });

  it('returns correct result for puzzle input', () => {
    const result = partTwo(PUZZLE_INPUT[1]);
    expect(result).toBe("807435693182510");
  });
});
