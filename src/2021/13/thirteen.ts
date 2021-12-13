interface Input {
  dots: number[][];
  instructions: [string, number][]
}

export const processInput = (input: string): Input => {
  const [dots, instructions] = input.split('\n\n');

  return {
    dots: dots.split('\n').map(x => x.split(',').map(y => Number(y))),
    instructions: instructions.split('\n').map(x => [x.split('=')[0], Number(x.split('=')[1])])
  }
};

export const run = ({ instructions, dots }: Input, falseOnce = true): number[][] => {
  const clonedDots: number[][] = JSON.parse(JSON.stringify(dots));
  for (let instruction of instructions) {
    clonedDots.forEach(dot => {
      if (instruction[0].includes('x') && dot[0] > instruction[1]) {
        dot[0] = 2*instruction[1] - dot[0]
      } else if (instruction[0].includes('y') && dot[1] > instruction[1]) {        
        dot[1] = 2 * instruction[1] - dot[1];
      }
    });
    if (falseOnce) {
      return clonedDots;
    }
  }
  return clonedDots;
};

export const partOne = (input: Input) => run(input).reduce((acc, curr) => acc.add(curr.join(',')), new Set()).size;

export const partTwo = (input: Input) => {
  const dots: number[][] = run(input, false);
  const xMax = Math.max(...dots.map(([x]) => x));
  const yMax = Math.max(...dots.map(([_, y]) => y));
  const array = new Array(yMax + 1).fill([]).map(x => new Array(xMax + 1).fill('.'));
  for (let [x,y] of dots) {
    array[y][x] = '#';
  }
  return array.map(x => x.join('')).join('\n');
};