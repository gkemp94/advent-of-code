import { partOne, runProgram, partTwo } from ".";
import readInput from "../../utils/readInput";
import path from 'path';

const exampleOne = 
`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;


const exampleTwo = 
`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;

describe('Part One', () => {
  it('Produces Correct Answer for Samples', () => {
    expect(partOne(exampleOne)).toBe(42);
  });

  it('Outputs Correct Answer for Part One', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partOne(data);
    console.log(`Part One: ${result}`);
    expect(result).toBe(224901)
  });
});


describe('Part Two', () => {
  it('Produces Correct Answer for Samples', () => {
    expect(partTwo(exampleTwo)).toBe(4);
  });

  it('Outputs Correct Answer for Part Two', () => {
    const data = readInput(path.resolve(__dirname, './input.txt'));
    const result = partTwo(data);
    console.log(`Part Two: ${result}`);
    expect(result).toBe(334)
  });
});