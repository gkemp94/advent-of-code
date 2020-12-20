import { partOne, partTwo, processInput } from "./twenty";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, 'sample_1.txt'));
const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('returns 20899048083289 for sample input.', () => {
   expect(partOne(SAMPLE_INPUT)).toBe(20899048083289);
  });

  it('returns correct result for puzzle input', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(174206308298779);
  });
/*
});

describe('Part Two', () => {
  it('returns 23340 for sample input.', () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(23340);
  });
  /*
  it('returns correct result for puzzle input', () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(65658760783597);
  });
*/
});

