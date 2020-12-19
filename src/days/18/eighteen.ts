export const processInput = (input: string): string[] => {
  return input.split('\n')
};

export const reduce = (string: string) => {
  let depth = 0;
  let output: string[] = [];
  let current: string[] = [];
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char === "(") {
      depth++;
      if (depth === 1) {
        continue;
      }
    } else if (char === ")") {
      depth--;
      if (depth === 0) {
        output.push(current.join(''));
        current = [];
      }
    } 
    if (depth) {
      current.push(char);
    }
  }
  return output;
}

export const solve = (input: string): string => {
  while (reduce(input).length) {
    const internals = reduce(input);
    for (let i = 0; i < internals.length; i++) {
      const internal = internals[i];
      input = input.replace(`(${internal})`, solve(internal));
    }
  }
  const expression = input.split(' ');
  while (expression.length > 1) {
    const x = parseInt(expression.shift()!);
    const op = expression.shift()
    const y = parseInt(expression[0]);
    expression[0] = `${eval(`${x} ${op} ${y}`)}`;
  }
  return expression[0];
}

export const solvePart2 = (input: string): string => {
  while (reduce(input).length) {
    const internals = reduce(input);
    for (let i = 0; i < internals.length; i++) {
      const internal = internals[i];
      input = input.replace(`(${internal})`, solvePart2(internal));
    }
  }
  const expression = input.split(' ');
  for (let i = 0; i < expression.length; i = i + 2) {
    if (!expression[i + 1] || expression[i + 1] === '*') continue;
    const x = parseInt(expression.splice(i, 1)[0]!);
    const op = expression.splice(i, 1)[0];
    const y = parseInt(expression[i]);
    expression[i] = expression[i] = `${eval(`${x} ${op} ${y}`)}`;
    i = i - 2;
  }

  while (expression.length > 1) {
    const x = parseInt(expression.shift()!);
    const op = expression.shift()
    const y = parseInt(expression[0]);
    expression[0] = `${eval(`${x} ${op} ${y}`)}`;
  }
  
  return expression[0];
}

export const partOne = (input: string[]) => {
  return input.reduce<number>((prev, x) => {
    return prev + parseInt(solve(x));
  }, 0);
}

export const partTwo = (input: string[]) => {
  return input.reduce<number>((prev, x) => {
    return prev + parseInt(solvePart2(x));
  }, 0);
};