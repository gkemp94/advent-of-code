import { partOne, partTwo, processInput } from "./ten";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, "sample.txt"));
const PUZZLE_INPUT = processInput(getFile(__dirname, "input.txt"));

describe("Part One", () => {
  it("returns correct answer for sample input.", () => {
    expect(partOne(SAMPLE_INPUT)).toBe(8);
  });
  it("returns correct answer for puzzle input", () => {
    expect(partOne(PUZZLE_INPUT)).toBeGreaterThan(7172);
    expect(partOne(PUZZLE_INPUT)).toBe(7173);
  });
});

describe("Part Two", () => {
  it.todo("returns correct answer for sample input.");
  it.todo("returns correct answer for puzzle input");
});
