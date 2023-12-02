import { partOne, partTwo, processInput } from "./two";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, "sample.txt"));
const PUZZLE_INPUT = processInput(getFile(__dirname, "input.txt"));

describe("Part One", () => {
  it("returns correct answer for sample input.", () => {
    expect(partOne(SAMPLE_INPUT, 12, 13, 14)).toBe(8);
  });
  it("returns correct answer for puzzle input", () => {
    const result = partOne(PUZZLE_INPUT, 12, 13, 14);
    expect(result).toBe(2406);
  });
});

describe("Part Two", () => {
  it("returns correct answer for sample input.", () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(2286);
  });
  it("returns correct answer for puzzle input", () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(78375);
  });
});
