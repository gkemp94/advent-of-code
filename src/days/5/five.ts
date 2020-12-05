export const processInput = (input: string): string[] => {
  return input.split('\n');
};

const getSeatId = ([row, col]: number[]): number => {
  return (row * 8) + col;
};

export const getPosition = (input: string) => {
  const dirs = input.split('');
  let rows = [0, 127];
  let cols = [0, 7];
  // Get Row
  for (let i = 0; i < 7; i++) {
    rows[0] = dirs[i] === 'F' ? rows[0] : Math.ceil(rows[0] + ((rows[1] - rows[0]) / 2));
    rows[1] = dirs[i] === 'F' ? Math.floor(rows[0] + ((rows[1] - rows[0]) / 2)) : rows[1];
  }
  // Get Column
  for (let i = 7; i < dirs.length; i++) {
    cols[0] = dirs[i] === 'L' ? cols[0] : Math.ceil(cols[0] + ((cols[1] - cols[0]) / 2));
    cols[1] = dirs[i] === 'L' ? Math.floor(cols[0] + ((cols[1] - cols[0]) / 2)) : cols[1];
  }
  return [rows[0], cols[0]];
}

export const partOne = (input: string[]) => {
  return Math.max(...input.map(x => {
    return getSeatId(getPosition(x))
  }))
};

export const partTwo = (input: string[]) => {
  const seating = new Array(128).fill(null).map(() => new Array(8).fill(null).map(() => '0'));
  const seatIds = new Set();
  // Fill Seats
  for (let i = 0; i < input.length; i++) {
    const [row, col] = getPosition(input[i]);
    seatIds.add(getSeatId([row, col]));
    seating[row][col] = 'X';
  }

  // Identify Correct Seat
  for (let row = 0; row < seating.length; row++) {
    for (let col = 0; col < seating[0].length; col++) {
      if (seating[row][col] === '0') {
        const id = getSeatId([row, col]);
        if (seatIds.has(id + 1) && seatIds.has(id - 1)) {
          return id;
        }
      };
    }
  }
};
