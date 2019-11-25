import { one, two } from '.';
import path from 'path';
import readInput from '../../utils/readInput';

const examplesPartOne = [
  [`+1, +1, +1`, 3],
  [`+1, +1, -2`,  0],
  [`-1, -2, -3`, -6]
]

const examplesPartTwo = [
  [`+1, -1 `, 0],
  [`+3, +3, +4, -2, -4`,10],
  [`-6, +3, +8, +5, -6`, 5],
  [`+7, +7, -2, -7, -4`, 14],
]

describe('Day One', () => {
  describe('Part One', () => {
    examplesPartOne.map((example) => {
      it (`Ex: ${example[0]} results in ${example[1]}`, () => {
        const input = example[0].split(', ').map(Number);
        expect(one(input)).toBe(example[1]);
      });
    });
    it (`Input results in correct answer`, async () => {
      const data = readInput(path.resolve(__dirname, './input.txt'));
      const input = data.split('\n').map(Number);
      const result = one(input);
      console.log(`Part One Answer: ${result}`);
      expect(result).toBe(505);
    });
  });

  describe('Part Two', () => {
    examplesPartTwo.map((example) => {
      it (`Ex: ${example[0]} results in ${example[1]}`, () => {
        const input = example[0].split(', ').map(Number);
        expect(two(input)).toBe(example[1]);
      });
    });
    it (`Input results in correct answer`, async () => {
      const data = readInput(path.resolve(__dirname, './input.txt'));
      const input = data.split('\n').map(Number);
      const result = two(input);
      console.log(`Part Two Answer: ${result}`);
      expect(result).toBe(72330);
    });
  });
})
