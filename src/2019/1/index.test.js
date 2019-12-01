import { calculateFuel, partOne, calculateAdditionalFuel, partTwo } from "."
import readInput from "../../utils/readInput";
import path from 'path';

describe('Day One', () => {
  it('calculates fuel correctly', () => {
    expect(calculateFuel(12)).toBe(2);
    expect(calculateFuel(14)).toBe(2);
    expect(calculateFuel(1969)).toBe(654);
    expect(calculateFuel(100756)).toBe(33583);
  });

  it('calculates fuel requirements correctly for part one', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const input = data.split('\n').map(Number);
    const result = partOne(input);
    console.log(`Part One Answer: ${result}`);
    expect(result).toBe(3429947);
  });

  it('calculates additional fuel correctly', () => {
    expect(calculateAdditionalFuel(12)).toBe(2);
    expect(calculateAdditionalFuel(14)).toBe(2);
    expect(calculateAdditionalFuel(1969)).toBe(966);
    expect(calculateAdditionalFuel(100756)).toBe(50346);
  });

  it('calculates fuel requirements correctly for part two', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const input = data.split('\n').map(Number);
    const result = partTwo(input);
    console.log(`Part Two Answer: ${result}`);
    expect(result).toBe(5142043);
  });
})