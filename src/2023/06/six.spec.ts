import { partOne, partTwo, processInput } from "./six";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, "sample.txt"));
const PUZZLE_INPUT = processInput(getFile(__dirname, "input.txt"));

describe("Part One", () => {
  it("returns correct answer for sample input.", () => {
    expect(partOne(SAMPLE_INPUT)).toBe(288);
  });
  it("returns correct answer for puzzle input", () => {
    expect(partOne(PUZZLE_INPUT)).toBe(3316275);
  });
});

describe("Part Two", () => {
  it("returns correct answer for sample input.", () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(71503);
  });
  it("returns correct answer for puzzle input", () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(27102791);
  });
});
