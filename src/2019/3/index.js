import { intersection, get, set } from 'lodash';

const processInput = (input) => {
  return input.split(`\n`).map(wire => {
    return wire.trim().split(',').map((cmd) => {
      const split = cmd.split('');
      const direction = split.shift();
      return { direction, distance: Number(split.join('')) };
    })
  })
}

const move = (pos, dir) => {
  switch(dir) {
    case 'U':
      pos[1] = pos[1] + 1;
      break;
    case 'D':
      pos[1] = pos[1] - 1;
      break;
    case 'R':
      pos[0] = pos[0] + 1;
      break;
    case 'L':
      pos[0] = pos[0] - 1;
      break;
  }
  return pos;
}

export const partOne = (input) => {
  const wires = processInput(input);
  const paths = wires.map(wire => {
    const cells = {};
    let pos = [0, 0];
    for (let i = 0; i < wire.length; i++) {
      const { direction, distance } = wire[i];
      for (let x = 0; x < distance; x++) {
        pos = move(pos, direction);
        cells[pos[0]] = cells[pos[0]] ? [...cells[pos[0]], pos[1]] : [pos[1]]
      }
    }
    return cells;
  });
  const intersections = [];
  
  for (let i = 0; i < Object.keys(paths[0]).length; i++) {
    const x = Object.keys(paths[0])[i];
    if (paths[1][x]) {
      // They were both on the same x at some point
      intersection(paths[0][x], paths[1][x]).forEach(y => {
        intersections.push([x, y]);
      })
    }
  }
  return Math.min(...intersections.map(([x, y]) => Math.abs(x) + Math.abs(y)));
}

export const partTwo = (input) => {
  const wires = processInput(input);
  const paths = wires.map(wire => {
    //const path = [];
    const cells = {};
    let pos = [0, 0, 0];
    for (let i = 0; i < wire.length; i++) {
      const { direction, distance } = wire[i];
      for (let x = 0; x < distance; x++) {
        pos = move(pos, direction);
        pos[2]++;
        if (!get(cells, `x${pos[0]}.y${pos[1]}`)) {
          set(cells, `x${pos[0]}.y${pos[1]}`, pos[2]);
        }
        //path.push([...pos]);
      }
    }
    return cells;
  });
  const intersectionDistances = [];
  for (let i = 0; i < Object.keys(paths[0]).length; i++) {
    const x = Object.keys(paths[0])[i];
    for (let j = 0; j < Object.keys(paths[0][x]).length; j++) {
      const y = Object.keys(paths[0][x])[j];
      if (get(paths[1], `${x}.${y}`)) {
        intersectionDistances.push(paths[1][x][y] + paths[0][x][y]);
      }
    }

  }
  return Math.min(...intersectionDistances);
}