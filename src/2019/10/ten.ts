export const processInput = (input: string): string[][] => {
  return input.split('\n').map(x => x.split(''));
};

const listAstroids = (input: string[][]) => {
  const results = [];
  for (let x = 0; x < input.length; x++) {
    const row = input[x];
    for (let y = 0; y < row.length; y++) {
      if(input[x][y] === '#') {
        results.push([x, y]);
      }
    }
  }
  return results;
}
export const partOne = (input: string[][]) => {
  const astroids = listAstroids(input);
  let maxAstroids = 0;
  for (let x = 0; x < input.length; x++) {
    const row = input[x];
    for (let y = 0; y < row.length; y++) {
      const location = [x,y];
      if (input[x][y] !== '#') continue
      const set = new Set();
      for (let i = 0; i < astroids.length; i++) {
        const astroid = astroids[i];
        if (astroid[0] === location[0] && astroid[1] === location[1]) continue;
        const traj = Math.atan2(astroid[0] - location[0], astroid[1] - location[1]);
        set.add(traj)
      }

      maxAstroids = Math.max(maxAstroids, set.size)
    }
  }
  return maxAstroids;
};
