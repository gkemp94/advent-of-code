import { partOne, processInput } from "./ten";
import { getFile } from "../../utils/getInput";

const PUZZLE_INPUT = processInput(getFile(__dirname, 'input.txt'));

describe('Part One', () => {
  it('expect result to be correct', () => {
    expect(partOne(PUZZLE_INPUT)).toBe(230);
  })
});


