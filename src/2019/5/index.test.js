import { partOne, runProgram, partTwo } from ".";
import readInput from "../../utils/readInput";
import path from 'path';

describe('Part One', () => {
  it('Produces Correct IntCode for Samples', () => {
    expect(runProgram('1,0,0,0,99'.split(',').map(Number)).program.join(',')).toBe('2,0,0,0,99');
    expect(runProgram('2,3,0,3,99'.split(',').map(Number)).program.join(',')).toBe('2,3,0,6,99');
    expect(runProgram('2,4,4,5,99,0'.split(',').map(Number)).program.join(',')).toBe('2,4,4,5,99,9801');
    expect(runProgram('1,1,1,4,99,5,6,0,99'.split(',').map(Number)).program.join(',')).toBe('30,1,1,4,2,5,6,0,99');
  });

  it('Outputs Correct Answer for Part One', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partOne(data);
    expect(result).toBe(15259545)
  });
});

describe('Part Two', () => {
  it('Runs Tests Correctly', () => {
    expect(runProgram('3,9,8,9,10,9,4,9,99,-1,8'.split(',').map(Number), 8).output).toBe(1);
    expect(runProgram('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'.split(',').map(Number), 0).output).toBe(0);
    expect(runProgram('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'.split(',').map(Number), 0).output).toBe(0);
    expect(runProgram('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'.split(',').map(Number), 2).output).toBe(1);
  });

  it('Runs Larger Test', () => {
    const input = '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'.split(',').map(Number);
    expect(runProgram(input, 5).output).toBe(999);
    expect(runProgram(input, 8).output).toBe(1000);
    expect(runProgram(input, 15).output).toBe(1001);
  })

  it('Outputs Correct Answer for Part One', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partTwo(data);
    expect(result).toBe(7616021)
  });
});