type Instruction = [direction: string, value: number];

const INSTRUCTION_REGEX = /([A-Z])([0-9]+)/;

export const processInput = (input: string): Instruction[] => {
  return input.split('\n').filter(x => x).map(x => {
    const [_, direction, value] = x.match(INSTRUCTION_REGEX)!;
    return [direction, parseInt(value)]
  });
};

export const partOne = (input: Instruction[]) => {
  let pos = [0, 0];
  let dir = 90;
  for (let i = 0; i < input.length; i++) {
    const [direction, value] = input[i];
    switch(direction) {
      case 'N':
      case 'S':
        pos[1] += (direction === 'S' ? -1 : 1) * value;
        break;
      case 'W':
      case 'E':
        pos[0] += (direction === 'E' ? 1 : -1) * value;
        break;
      case 'L':
      case 'R':
        dir += (direction === 'R' ? 1 : -1) * value;
        break;
      case 'F':
        pos[0] += Math.sin(dir * Math.PI / 180) * value;
        pos[1] += Math.cos(dir * Math.PI / 180) * value;
        break;
    } 
  }
  return Math.round(Math.abs(pos[0]) + Math.abs(pos[1]));
}

export const partTwo = (input: Instruction[]) => {
  let waypointPos = [10, 1];
  let pos = [0, 0];
  for (let i = 0; i < input.length; i++) {
    const [direction, value] = input[i];
    switch(direction) {
      case 'N':
      case 'S':
        waypointPos[1] += (direction === 'S' ? -1 : 1) * value;
        break;
      case 'W':
      case 'E':
        waypointPos[0] += (direction === 'E' ? 1 : -1) * value;
        break;
      case 'L':
      case 'R':
        const rad = (direction === 'L' ? 1 : -1) * value * Math.PI / 180;
        waypointPos = [
          Math.cos(rad) *  waypointPos[0] - Math.sin(rad) * waypointPos[1],
          Math.sin(rad) *  waypointPos[0] + Math.cos(rad) * waypointPos[1],
        ];
        break;
      case 'F':
        pos[0] += value * waypointPos[0];
        pos[1] += value * waypointPos[1];
        break;
    }
  }
  return Math.round(Math.abs(pos[0]) + Math.abs(pos[1]));
};
