import { memo } from "../../utils/memo";


export const processInput = (input: string): [number, string[][]][] => {
  return input.split('\n\n').map(x => {
    const [id, piece] = x.split(':\n');
    return [parseInt(id.replace('Tile ', '')), piece.split('\n').map(x => x.split(''))];
  });
};

const computeSides = memo((tile => {
  return [
    tile[0].join(''),
    tile[tile.length - 1].join(''),
    new Array(tile.length).fill('').map((_, i) => {
      return tile[i][0]
    }).join(''),
    new Array(tile.length).fill('').map((_, i) => {
      return tile[i][tile.length - 1]
    }).join(''),
  ]
}));

export const partOne = (input: [number, string[][]][]) => {
  const map: Record<string, number[]> = {};

  // Populate Sides
  for (let i = 0; i < input.length; i++) {
    const sides: string[] = computeSides(input[i][1]);
    for (let j = 0; j < sides.length; j++) {
      if (map[sides[j]]) {
        map[sides[j]].push(input[i][0]);
      } else if (map[sides[j].split('').reverse().join('')]) {
        map[sides[j].split('').reverse().join('')].push(input[i][0]);
      } else {
        map[sides[j]] = [input[i][0]];
      }
    }
  }
  
  // Find Counts of Attatched Sides
  const counts: Record<string, number> = {};
  for (let i = 0; i < Object.keys(map).length; i++) {
    const key = Object.keys(map)[i];
    if (map[key].length === 1) {
      counts[map[key][0]] = counts[map[key][0]] ? counts[map[key][0]] + 1 : 1;
    }
  }
  return Object.keys(counts).reduce((prev, curr) => {
    return counts[curr] === 2 ? prev * parseInt(curr) : prev;
  }, 1)
};

export const partTwo = () => {

};