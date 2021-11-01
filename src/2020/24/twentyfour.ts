export const processInput = (input: string): string[] => {
  return input.split('\n');
};

const REGEX = /([sn]?[ew])/g;

const flip = (input: string[]) => {
  const tiles = new Set<string>();
  for (let i = 0; i < input.length; i++) {
    const instructions = input[i];
    const pointer = [0, 0];
    let result;
    while (result = REGEX.exec(instructions)) {
      const instruction = result[0];
      if (instruction.includes('n')) {
        pointer[1]--;
      } else if (instruction.includes('s')) {
        pointer[1]++;
      }

      if (instruction.includes('w') && !instruction.includes('n')) {
        pointer[0]--;
      } else if (instruction.includes('e') && !instruction.includes('s')) {
        pointer[0]++;
      }
    }
    const key = `${pointer[0]}.${pointer[1]}`
    tiles.has(key) ? tiles.delete(key) : tiles.add(key);
  }
  return tiles;
}

export const partOne = (input: string[]) => {
  return flip(input).size;
};

const getPotential = (tile: string) => {
  const potentialTiles = new Set<string>();
  const [x, y] = tile.split('.').map(x => parseInt(x));
  potentialTiles.add(`${x}.${y - 1}`);
  potentialTiles.add(`${x}.${y + 1}`);
  potentialTiles.add(`${x + 1}.${y - 1}`);
  potentialTiles.add(`${x + 1}.${y}`);
  potentialTiles.add(`${x - 1}.${y}`);
  potentialTiles.add(`${x - 1}.${y + 1}`);
  return potentialTiles
}

export const partTwo = (input: string[]) => {
  let prevTiles = flip(input);
  let newTiles = new Set<string>(prevTiles);

  for (let i = 0; i < 100; i++) {
    // Get All Potential Tiles
    const potentialTiles = new Set<string>(prevTiles);
    prevTiles.forEach(tile => {
      getPotential(tile).forEach(x => potentialTiles.add(x));
    });

    // For Each Potential Tile Determine Color
    potentialTiles.forEach(tile => {
      const adjBlackTiles = Array.from(getPotential(tile)).reduce((prev, curr) => {
        if (prevTiles.has(curr)) {
          return prev + 1;
        }
        return prev;
      }, 0);

      // Determine if it's black or white
      const isBlack = prevTiles.has(tile);
      if (isBlack) {
        if (adjBlackTiles === 0 || adjBlackTiles > 2) {
          newTiles.delete(tile);
        }
      } else {
        if (adjBlackTiles === 2) {
          newTiles.add(tile);
        }
      }
    })

    prevTiles = new Set(newTiles);
  }

  return prevTiles.size;
};