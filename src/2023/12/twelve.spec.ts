import { partOne, partTwo, processInput } from "./twelve";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, "sample.txt"));
const PUZZLE_INPUT = processInput(getFile(__dirname, "input.txt"));

describe("Part One", () => {
  it("returns correct answer for sample input.", () => {
    expect(partOne(SAMPLE_INPUT)).toBe(21);
  });
  it("returns correct answer for puzzle input", () => {
    expect(partOne(PUZZLE_INPUT)).toBe(7286);
  });
});

describe("Part Two", () => {
  it("returns correct answer for sample input.", () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(525152);
  });
  it("returns correct answer for puzzle input", () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(25470469710341);
  });
});
