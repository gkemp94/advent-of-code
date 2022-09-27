import { partOne, partTwo, processInput } from "./fifteen";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, "sample_1.txt"));
const PUZZLE_INPUT = processInput(getFile(__dirname, "input.txt"));

describe("Part One", () => {
  it("returns 40 for sample input.", () => {
    expect(partOne(SAMPLE_INPUT)).toBe(40);
  });

  it("returns correct result for puzzle input", () => {
    expect(partOne(PUZZLE_INPUT)).toBe(613);
  });
});

describe("Part Two", () => {
  it("returns 315 for sample input.", () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(315);
  });

  it("returns correct result for puzzle input", () => {
    const result = partTwo(PUZZLE_INPUT);
    expect(result).toBe(2899);
  });
});
