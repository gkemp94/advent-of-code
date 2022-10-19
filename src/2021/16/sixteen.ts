import { getFile } from "../../utils/getInput";

const clone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

const hex2bin = (hex: string) => {
  return hex
    .split("")
    .map((hex) => parseInt(hex, 16).toString(2).padStart(4, "0"))
    .join("")
    .split("")
    .map((val) => parseInt(val));
};

const bin2Hex = (bin: number[]) => {
  return parseInt(bin.join(""), 2);
};

type Options = {
  maxBitCount?: number;
  maxPacketCount?: number;
};

const run = (
  input: number[],
  { maxBitCount, maxPacketCount }: Options = {}
) => {
  let savedInput = clone(input);
  // console.log("input:", input.join(""));
  const values: number[] = [];
  const versions: number[] = [];

  let bitsProcessed = 0;
  let packetsProcessed = 0;
  while (
    input.length &&
    (!maxBitCount || bitsProcessed <= maxBitCount - 11) &&
    (!maxPacketCount || packetsProcessed < maxPacketCount)
  ) {
    const packetVersion = bin2Hex(input.splice(0, 3));
    const packetId = bin2Hex(input.splice(0, 3));

    versions.push(packetVersion);

    bitsProcessed += 6;
    packetsProcessed += 1;

    // Literal
    if (packetId === 4) {
      const literalBits: number[] = [];
      while (true) {
        const [initialBit] = input.splice(0, 1);
        const bits = input.splice(0, 4);
        bitsProcessed += 5;
        literalBits.push(...bits);
        if (initialBit === 0) {
          break;
        }
      }

      values.push(bin2Hex(literalBits));
    } else if (packetId >= 0 && packetId <= 7 && input.length >= 12) {
      // Operator
      const [lengthTypeId] = input.splice(0, 1);
      bitsProcessed += 1;
      const localValues: number[] = [];

      // Fetch Subpacket Values
      if (lengthTypeId === 0) {
        const maxBitCount = bin2Hex(input.splice(0, 15));
        bitsProcessed += 15;
        const subpacketResult = run(input, { maxBitCount });
        localValues.push(...subpacketResult.values);
        versions.push(...subpacketResult.versions);
      } else if (lengthTypeId === 1) {
        const maxPacketCount = bin2Hex(input.splice(0, 11));
        bitsProcessed += 11;
        const subpacketResult = run(input, { maxPacketCount });
        localValues.push(...subpacketResult.values);
        versions.push(...subpacketResult.versions);
      }

      if (!localValues.length) {
        console.log("Skipping");
        input = savedInput;
        return { values, versions };
      }

      // Do Operation
      switch (packetId) {
        case 0: {
          const value = localValues.reduce((acc, curr) => curr + acc, 0);
          values.push(value);
          break;
        }
        case 1: {
          const value = localValues.reduce((acc, curr) => curr * acc, 1);
          values.push(value);
          break;
        }
        case 2: {
          const value = Math.min(...localValues);
          values.push(value);
          break;
        }
        case 3: {
          const value = Math.max(...localValues);
          values.push(value);
          break;
        }
        case 5: {
          const value = localValues[0] > localValues[1] ? 1 : 0;
          values.push(value);
          break;
        }
        case 6: {
          const value = localValues[0] < localValues[1] ? 1 : 0;
          values.push(value);
          break;
        }
        case 7: {
          const value = localValues[0] === localValues[1] ? 1 : 0;
          values.push(value);
          break;
        }
      }
      // console.log({ packetId, localValues, values });
    }
  }

  return { values, versions };
};

export const partOne = (input: string) => {
  const { versions } = run(hex2bin(input));
  return versions.reduce((acc, curr) => acc + curr, 0);
};

export const partTwo = (input: string) => {
  const { values } = run(hex2bin(input));
  console.log(values.length);
  return values[0];
};
