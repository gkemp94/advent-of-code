export const processInput = (input: string): [string, number][] => {
  return input.split('\n').map(x => {
    const [direction, length] = x.split(' ');
    return [direction, Number(length)];
  });
};

export const partOne = (input: [string, number][]) => {
  const finalPos = input.reduce((acc, [direction, length]) => {
    switch(direction) {
      case 'forward': {
        return [acc[0], acc[1] + length];
      }
      case 'up': {
        return [acc[0] - length, acc[1]];
      }
      case 'down': {
        return [acc[0] + length, acc[1]];
      }
    }
    return acc;
  }, [0, 0]);
  return finalPos[0] * finalPos[1];
};

export const partTwo = (input: [string, number][]): number => {
  const finalPos = input.reduce(([depth, horizontal, aim], [direction, length]) => {
    switch(direction) {
      case 'forward': {
        return [depth + (aim * length), horizontal + length, aim];
      }
      case 'up': {
        return [depth, horizontal, aim - length];
      }
      case 'down': {
        return [depth, horizontal, aim + length];
      }
      default:
        return [depth, horizontal, aim];
    }
  }, [0, 0, 0]);
  return finalPos[0] * finalPos[1];
};
