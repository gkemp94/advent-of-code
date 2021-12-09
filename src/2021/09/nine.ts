class Location {
  public height: number;
  public adj?: [Location?, Location?, Location?, Location?]

  constructor(height: number) {
    this.height = height;
  }

  isLowPoint() {
    return !this.adj?.filter(location => location && location.height <= this.height).length;
  }

  basinSize() {
    const basinCollecton: Location[] = [this];
 
    for (let i = 0; i < basinCollecton.length; i++) {
      const adjBasin = basinCollecton[i].adj!.filter(x => x && x.height !== 9);
      adjBasin.forEach(adjLocation => {
        if(adjLocation && !basinCollecton.includes(adjLocation)) {
          basinCollecton.push(adjLocation);
        }
      })
    }
    return basinCollecton.length;
  }
}

export const processInput = (input: string): Location[] => {
  const locations = input.split('\n').map((x) => x.split('').map((height => new Location(Number(height)))));
  for (let i = 0; i < locations.length; i++) {
    for (let j = 0; j < locations[i].length; j++) {
      locations[i][j].adj = [locations[i-1] && locations[i-1][j], locations[i+1] && locations[i+1][j], locations[i][j-1], locations[i][j+1]];
    }
  }

  return locations.flat();
};


export const partOne = (input: Location[]) => {
  return input.reduce((acc, location) => location.isLowPoint() ? acc + location.height + 1 : acc, 0);
}

export const partTwo = (input: Location[]) => {
  const lowPoints = input.filter(location => location.isLowPoint());
  const basinSizes = lowPoints.map(location => location.basinSize()).sort((a, b) => b-a);
  return basinSizes.splice(0, 3).reduce((acc, size) => size * acc, 1);
};
