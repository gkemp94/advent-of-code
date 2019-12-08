import { partOne, runProgram, partTwo } from ".";
import readInput from "../../utils/readInput";
import path from 'path';

const expected = `
XXX  XXXX  XX   XX  X  X 
X  X X    X  X X  X X X  
X  X XXX  X    X  X XX   
XXX  X    X    XXXX X X  
X    X    X  X X  X X X  
X    X     XX  X  X X  X
`

describe('Part One', () => {
  it.only('Produces Correct Answer for Samples', () => {
    expect(partOne("123456789012", 3, 2)).toBe(1);
  });

  it.only('Outputs Correct Answer for Part One', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partOne(data, 25, 6);
    console.log(`Part One: ${result}`);
    expect(result).toBe(1064)
  });
});


describe('Part Two', () => {
  it.only('Produces Correct Answer for Samples', () => {
    const output = partTwo("0222112222120000", 2, 2);
    console.log(output);
    expect(output).toBe(` X\nX `);
  });

  it.only('Outputs Correct Answer for Part Two', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partTwo(data, 25, 6);
    console.log(`Part Two:`)
    console.log(`${result}`);
    expect(result).toContain(expected.trim());
  });
});