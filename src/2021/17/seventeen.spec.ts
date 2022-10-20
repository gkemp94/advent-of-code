import { partOne, partTwo, processInput } from "./seventeen";
import { getFile } from "../../utils/getInput";

const SAMPLE_INPUT = processInput(getFile(__dirname, "sample_1.txt"));
const PUZZLE_INPUT = processInput(getFile(__dirname, "input.txt"));

describe("Part One", () => {
  it("returns 45 for sample input.", () => {
    expect(partOne(SAMPLE_INPUT)).toBe(45);
  });
  it("returns correct answer for input.", () => {
    expect(partOne(PUZZLE_INPUT)).toBe(7381);
  });
});

describe("Part Two", () => {
  it("returns 112 for sample input.", () => {
    expect(partTwo(SAMPLE_INPUT)).toBe(112);
  });
  it("returns correct answer for input.", () => {
    expect(partTwo(PUZZLE_INPUT)).toBe(3019);
  });
});
