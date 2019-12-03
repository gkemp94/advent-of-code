const getWires = (input) => {
  return input.split(`\n`).map(wire => {
    return wire.trim().split(',').map((cmd) => {
      return { direction: cmd[0], distance: Number(cmd.slice(1)) };
    })
  })
};

const getPath = (wire) => {
  const path = new Map();
  const pos = { x: 0, y: 0, l: 0 };
  for (let i = 0; i < wire.length; i++) {
    const { direction, distance } = wire[i];
    for (let d = 0; d < distance; d++) {
      pos.x += direction === 'R' ? 1 : direction === 'L' ? -1 : 0;
      pos.y += direction === 'U' ? 1 : direction === 'D' ? -1 : 0;
      pos.l++
      path.set(`${pos.x}.${pos.y}`, pos.l);
    }
  }
  return path;
};

export const partOne = (input) => {
  const wires = getWires(input);
  const [wireOnePath, wireTwoPath] = wires.map(getPath);
  return Math.min(...[...wireOnePath.entries()]
    .filter(([pos]) => wireTwoPath.has(pos))
    .map(([pos]) => pos.split('.').map(Number).map(Math.abs).reduce((total, x) => x + total, 0)));
};

export const partTwo = (input) => {
  const wires = getWires(input);
  const [wireOnePath, wireTwoPath] = wires.map(getPath);
  return Math.min(...[...wireOnePath.entries()]
    .filter(([pos]) => wireTwoPath.has(pos))
    .map(([pos, dist]) => dist + wireTwoPath.get(pos)));
};