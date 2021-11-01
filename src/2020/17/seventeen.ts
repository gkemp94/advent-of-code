export const processInput = (input: string, dimensions = 3): any => {
  const activeCubes = new Set<string>();

  input.split('\n').forEach((row, x) => {
    return row.split('').forEach((column, y) => {
      if (column === '.') return;
      const arr = new Array(dimensions).fill(0)
      arr[0] = x;
      arr[1] = y;
      activeCubes.add(arr.join(','));
    });
  });

  return activeCubes;
};

export const partOne = (initialCubes: Set<string>) => {
  let previousCubes = new Set(initialCubes);
  for (let i = 0; i < 6; i++) {

    // Get All Potentially Affected Cubes
    const allPotentiallyAffected = new Set<string>();
    previousCubes.forEach((_, key) => {
      const [x, y, z] = key.split(',').map(x => parseInt(x));
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            allPotentiallyAffected.add(`${x + i},${y + j},${z + k}`);
          }
        }
      }
    });

    const newCubes = new Set<string>();
    allPotentiallyAffected.forEach(key => {
      const [x, y, z] = key.split(',').map(x => parseInt(x));
      const isActive = previousCubes.has(key);
      let activeNeighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            if (i === 0 && j === 0 && k === 0) continue;
            if(previousCubes.has(`${x + i},${y + j},${z + k}`)) activeNeighbors++;
          }
        }
      }

      if (isActive) {
        if (activeNeighbors === 2 || activeNeighbors === 3) {
          newCubes.add(key);
        }
      } else if (activeNeighbors === 3) {
        newCubes.add(key);
      }
    });
    previousCubes = new Set(newCubes);
  }
  return previousCubes.size;
}

export const partTwo = (initialCubes: Set<string>) => {
  let previousCubes = new Set(initialCubes);
  for (let i = 0; i < 6; i++) {

    // Get All Potentially Affected Cubes
    const allPotentiallyAffected = new Set<string>();
    previousCubes.forEach((_, key) => {
      const [x, y, z, t] = key.split(',').map(x => parseInt(x));
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
              allPotentiallyAffected.add(`${x + i},${y + j},${z + k},${t + l}`);
            }
          }
        }
      }
    });

    const newCubes = new Set<string>();
    allPotentiallyAffected.forEach(key => {
      const [x, y, z, t] = key.split(',').map(x => parseInt(x));
      const isActive = previousCubes.has(key);
      let activeNeighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
              if (i === 0 && j === 0 && k === 0 && l === 0) continue;
              if(previousCubes.has(`${x + i},${y + j},${z + k},${t + l}`)) activeNeighbors++;
            }
          }
        }
      }

      if (isActive) {
        if (activeNeighbors === 2 || activeNeighbors === 3) {
          newCubes.add(key);
        }
      } else if (activeNeighbors === 3) {
        newCubes.add(key);
      }
    });
    previousCubes = new Set(newCubes);
  }
  return previousCubes.size;
};