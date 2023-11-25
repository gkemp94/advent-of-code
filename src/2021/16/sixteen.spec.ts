import { partOne, partTwo } from "./sixteen";
import { getFile } from "../../utils/getInput";

const PUZZLE_INPUT = getFile(__dirname, "input.txt");

describe("Part One", () => {
  it("returns 6 for sample input.", () => {
    expect(partOne("D2FE28")).toBe(6);
  });

  it("returns 16 for sample inout", () => {
    expect(partOne("8A004A801A8002F478")).toBe(16);
  });

  it("returns correct answer for puzzle input", () => {
    expect(partOne(PUZZLE_INPUT)).toBe(984);
  });
});

describe("Part Two", () => {
  it("returns 3 for sample input.", () => {
    expect(partTwo("C200B40A82")).toBe(3);
  });

  it("returns 54 for sample input.", () => {
    expect(partTwo("04005AC33890")).toBe(54);
  });

  it("returns 7 for sample input.", () => {
    expect(partTwo("880086C3E88112")).toBe(7);
  });

  it("returns 9 for sample input.", () => {
    expect(partTwo("CE00C43D881120")).toBe(9);
  });

  it("returns 1 for sample input.", () => {
    expect(partTwo("D8005AC2A8F0")).toBe(1);
  });

  it("returns 0 for sample input.", () => {
    expect(partTwo("9C005AC2F8F0")).toBe(0);
  });

  it("returns 9 for sample input.", () => {
    expect(partTwo("9C005AC2F8F0")).toBe(0);
  });

  it("returns 1 for sample input.", () => {
    expect(partTwo("9C0141080250320F1802104A08")).toBe(1);
  });

  xit("returns correct result for puzzle input", () => {
    const result = partTwo(PUZZLE_INPUT);
    expect(result).not.toBe(315756);
    expect(result).not.toBe(0);
  });
});
