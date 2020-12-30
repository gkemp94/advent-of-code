export const processInput = (input: string): [number, string[][]][] => {
  return input.split('\n\n').map(x => {
    const [id, piece] = x.split(':\n');
    return [parseInt(id.replace('Tile ', '')), piece.split('\n').map(x => x.split(''))];
  });
};

const reverse = (str: string) => {
  return str.split('').reverse().join('');
};

const computeSides = (tile: string[][]): [string, string, string, string] => {
  return [
    tile[0].join(''), // Top
    tile[tile.length - 1].join(''), // Bottom
    new Array(tile.length).fill('').map((_, i) => {
      return tile[i][0]
    }).join(''), // Left
    new Array(tile.length).fill('').map((_, i) => {
      return tile[i][tile.length - 1] // Right
    }).join(''),
  ]
};;

const populateSides = (tiles: Map<number, Tile>) => {
  const sidesObj: any = {};
  tiles.forEach(tile => {
    const sides = tile.sides;
    sides.forEach(side => {
      if (sidesObj[side]) {
        sidesObj[side].push(tile.id);
      } else if (sidesObj[reverse(side)]) {
        sidesObj[reverse(side)].push(tile.id);
      } else {
        sidesObj[side] = [tile.id];
      }
    })
  });

  const counts: Record<number, number> = {};
  const emptySides: Record<number, string[]> = {};
  Object.keys(sidesObj).forEach(key => {
    if (sidesObj[key].length === 1) {
      counts[sidesObj[key][0]] = (counts[sidesObj[key][0]] || 0) + 1;
      emptySides[sidesObj[key][0]] = (emptySides[sidesObj[key][0]] || []).concat([key]);
    }
  });

  return { counts, emptySides, sidesObj };
};

const createTiles = (input: [number, string[][]][]): Map<number, Tile> => {
  return input.reduce((prev, curr) => {
    prev.set(curr[0], new Tile(...curr));
    return prev;
  }, new Map<number, Tile>())
};

export const partOne = (input: [number, string[][]][]) => {
  const tiles = createTiles(input);
  const { counts } = populateSides(tiles);

  return Object.keys(counts).reduce((prev, curr) => {
    return counts[parseInt(curr)] === 2 ? prev * parseInt(curr) : prev;
  }, 1);
};

class Tile {
  public readonly id: number;
  public posId = 0;
  public tile: string[][];
  public attatched: boolean = false;

  constructor(id: number, tile: string[][]) {
    this.id = id;
    this.tile = tile;
  }

  get sides() {
    return computeSides(this.tile);
  };

  get print() {
    return this.tile.map(x => x.join('')).join('\n');
  }

  get trimmed() {
    const cloned: string[][] = JSON.parse(JSON.stringify(this.tile));
    cloned.shift();
    cloned.pop();
    return cloned.map(x => {
      x.shift();
      x.pop();
      return x;
    });
  }

  private flip() {
    this.tile.reverse();
  }

  private rotate() {
    this.tile = this.tile[0].map((val, index) => this.tile.map(row => row[index]).reverse())
  }

  public transform() {
    if (this.posId < 3 || this.posId > 3) {
      this.rotate();
    } else if (this.posId === 3) {
      this.flip();
    }
    this.posId = (this.posId + 1) % 8;
  }
};

const printGrid = (grid: Tile[][]): string => {
  const result: any = [];
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    const combinedRows: string[][] = [];
    for (let j = 0; j < row.length; j++) {
      row[j].trimmed.forEach((x, i) => {
        combinedRows[i] = (combinedRows[i] || []).concat(x);
      });
    }
    result.push(combinedRows.map(x => x.join('')).join('\n'));
  }
  return result.join('\n');
}

export const partTwo = (input: [number, string[][]][]) => {
  const tiles = createTiles(input);
  const { counts, emptySides } = populateSides(tiles);

  const firstTileId = parseInt(Object.keys(counts).find(x => counts[parseInt(x)] === 2)!);
  const firstTileEmptySides = emptySides[firstTileId];
  const firstTile = tiles.get(firstTileId)!;

  const grid: Tile[][] = [[firstTile]];

  // Align & Transform First Tile
  firstTile.attatched = true;
  while (true) {
    firstTile.transform();
    const [top, _, left, __] = firstTile.sides;
    if ((firstTileEmptySides.includes(top) || firstTileEmptySides.includes(reverse(top))) && 
        (firstTileEmptySides.includes(left) || firstTileEmptySides.includes(reverse(left)))
    ) {
      break;
    }
  }

  // Build Out Rows
  let bottom = firstTile.sides[1];
  while (true) {
    const nextTileId = Array.from(tiles.keys()).find(key => {
      return !tiles.get(key)?.attatched && (tiles.get(key)?.sides.includes(bottom) || tiles.get(key)?.sides.includes(reverse(bottom)));
    });

    if (!nextTileId) {
      break;
    }

    const nextTile = tiles.get(nextTileId)!;
    while (true) {
      nextTile.transform();
      const [top] = nextTile.sides;
      if (top === bottom) {
        break;
      } 
    }

    nextTile.attatched = true;
    grid.push([nextTile]);

    bottom = nextTile.sides[1];
  } 

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    let right = row[0].sides[3];
    while (true) {
      const nextTileId = Array.from(tiles.keys()).find(key => {
        return !tiles.get(key)?.attatched && (tiles.get(key)?.sides.includes(right) || tiles.get(key)?.sides.includes(reverse(right)));
      });
  
      if (!nextTileId) {
        break;
      }
  
      const nextTile = tiles.get(nextTileId)!;
      while (true) {
        nextTile.transform();
        const left = nextTile.sides[2];
        if (left === right) {
          break;
        } 
      }
  
      nextTile.attatched = true;
      row.push(nextTile);
  
      right = nextTile.sides[3];
    }
  }


  const finalTile = new Tile(-1, printGrid(grid).split('\n').map(x => x.split('')));

  let hasNotFoundMonstor = true;
  while (hasNotFoundMonstor) {
    finalTile.transform();
    for (let x = 0; x < finalTile.tile.length - 2; x++) {
      for (let y = 0; y < finalTile.tile[x].length - 19; y++) {
        if(findMonster(finalTile.tile, x, y)) {
          hasNotFoundMonstor = false;
          for (let i = 0; i < MONSTER_MATRIX.length; i++) {
            const [dx, dy] = MONSTER_MATRIX[i];
            finalTile.tile[x + dx][y + dy] = 'O';
          }
        }
      }
    };
  }

  return finalTile.tile.flat().filter((x: string) => x === '#').length;
}

const findMonster = (grid: string[][], x: number, y: number) => {
  for (let i = 0; i < MONSTER_MATRIX.length; i++) {
    const [dx, dy] = MONSTER_MATRIX[i];
    if (!grid[x + dx] || grid[x + dx][y + dy] !== '#') {
      return false
    }
  }
  return true;
};


const MONSTER_MATRIX = [
  [0, 0],
  [1, 1],
  [1, 4],
  [0, 5],
  [0, 6],
  [1, 7],
  [1, 10],
  [0, 11],
  [0, 12],
  [1, 13],
  [1, 16],
  [0, 17],
  [0, 18],
  [0, 19],
  [-1, 18],
];
