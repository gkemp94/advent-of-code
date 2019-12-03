import { partOne, runProgram, partTwo } from ".";
import readInput from "../../utils/readInput";
import path from 'path';

describe('Part One', () => {
  it('Produces Correct Distance for Samples', () => {
    expect(partOne(`R75,D30,R83,U83,L12,D49,R71,U7,L72
    U62,R66,U55,R34,D71,R55,D58,R83`)).toBe(159);
    expect(partOne(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
    U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`)).toBe(135);
  });

  it('Outputs Correct Answer for Part One', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partOne(data);
    console.log(`Part One: ${result}`);
    expect(result).toBe(1211);
  });
});

describe('Part One', () => {
  it('Produces Correct Distance for Samples', () => {
    expect(partTwo(`R75,D30,R83,U83,L12,D49,R71,U7,L72
    U62,R66,U55,R34,D71,R55,D58,R83`)).toBe(610);
    expect(partTwo(`R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
    U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`)).toBe(410);
  });
  it('Ouputs Correct Answer for Part Two', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partTwo(data);
    console.log(`Part Two: ${result}`);
    expect(result).toBe(101386);
  });
});
