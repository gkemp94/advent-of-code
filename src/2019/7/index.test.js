import { partOne, runProgram, partTwo } from ".";
import readInput from "../../utils/readInput";
import path from 'path';

describe('Part One', () => {
  it('Produces Correct IntCode for Samples', () => {
    const input = `3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`
    expect(partOne(input)).toBe(43210);
  });

  it('Outputs Correct Answer for Part One', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partOne(data);
    console.log(`Part One: ${result}`);
    expect(result).toBe(437860)
  });
});

describe('Part Two', () => {
  it('Runs Tests Correctly', () => {
    expect(partTwo(`3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`)).toBe(139629729);
    expect(partTwo(`3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10`)).toBe(18216);
  });

  it('Outputs Correct Answer for Part One', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partTwo(data);
    console.log(`Part Two: ${result}`);
    expect(result).toBeGreaterThan(7616021)
    expect(result).toBe(49810599);
  });
});