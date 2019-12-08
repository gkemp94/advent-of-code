import { partOne, runProgram, partTwo } from ".";
import readInput from "../../utils/readInput";
import path from 'path';

describe('Part One', () => {
  /*
  it('Produces Correct IntCode for Samples', () => {
    expect(runProgram('1,0,0,0,99'.split(',').map(Number)).join(',')).toBe('2,0,0,0,99');
    expect(runProgram('2,3,0,3,99'.split(',').map(Number)).join(',')).toBe('2,3,0,6,99');
    expect(runProgram('2,4,4,5,99,0'.split(',').map(Number)).join(',')).toBe('2,4,4,5,99,9801');
    expect(runProgram('1,1,1,4,99,5,6,0,99'.split(',').map(Number)).join(',')).toBe('30,1,1,4,2,5,6,0,99');
  });
  */

  it('Outputs Correct Answer for Part One', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partOne(data);
    expect(Number(result)).toBeGreaterThan(250635);
    console.log(`Part One: ${partOne(data)}`);
    expect(partOne(data)).toBe(4570637);
  });
});

describe('Part Two', () => {
  it('Outputs Correct Answer for Part Two', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partTwo(data);
    console.log(`Part Two: ${result}`);
    expect(result).toBeLessThan(13900);
    expect(result).toBe(5485);
  });
});
