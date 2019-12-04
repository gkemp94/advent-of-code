import { partOne, partTwo, isValid } from ".";
import readInput from "../../utils/readInput";
import path from 'path';

describe('Part One', () => {
  it('Returns Correct Answers for Validity Function', () => {
    expect(isValid(111111)).toBe(true);
    expect(isValid(223450)).toBe(false);
    expect(isValid(123789)).toBe(false);
  });

  it('Returns Answer for Part One', () => {
    const input = readInput(path.join(__dirname, './input.txt'));
    const result = partOne(input);
    console.log(`Part One: ${result}`);
    expect(result).toBe(511);
  });
});

describe('Part Two', () => {
  it('Returns Correct Answers for Validity Function', () => {
    expect(isValid(112233, true)).toBe(true);
    expect(isValid(123444, true)).toBe(false);
    expect(isValid(111122, true)).toBe(true);
    expect(isValid(777777, true)).toBe(false);
    expect(isValid(788888, true)).toBe(false);
    expect(isValid(444589, true)).toBe(false);
  });

  it('Returns Answer for Part Two', () => {
    const input = readInput(path.join(__dirname, './input.txt'));
    const result = partTwo(input);
    console.log(`Part Two: ${result}`);
    expect(result).not.toBe(290);
    expect(result).toBeLessThan(384);
  });
});
