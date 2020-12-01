import { partOne, partTwo, processInput } from "./one";
import fs from 'fs';
import path from 'path';

const SAMPLE_INPUT = `1721
979
366
299
675
1456`;

describe('Part One', () => {
  it('returns 514579 for sample input.', () => {
    expect(partOne(processInput(SAMPLE_INPUT))).toBe(514579);
  });
  it('returns correct result for puzzle input', () => {
    const data = processInput(fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8'));
    expect(partOne(data)).toBe(980499);
  })
});

describe('Part Two', () => {
  it('returns 514579 for sample input.', () => {
    expect(partTwo(processInput(SAMPLE_INPUT))).toBe(241861950);
  });
  it('returns correct result for puzzle input', () => {
    const data = processInput(fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8'));
    expect(partTwo(data)).toBe(200637446);
  })
});
