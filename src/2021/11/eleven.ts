class Octopus {
  public energy: number;
  public original: number;
  public pulses: number = 0;
  public adj: Octopus[] = [];
  public hasPulsed: boolean = false;
  public i: number;
  public j: number;
  constructor(energy: number, i: number, j: number) {
    this.original = energy;
    this.energy = energy;
    this.i = i;
    this.j = j;
  }

  reset() {
    this.pulses = 0;
    this.energy = this.original;
    this.hasPulsed = false;
  }

  increment() {
    if (this.hasPulsed) return;
    this.energy++;
    if (this.energy > 9) {
      this.hasPulsed = true;
      this.pulses++;
      this.energy = 0;
      this.adj.forEach(x => {
        x.increment()
      });
    }
  }
}

export const processInput = (input: string): Octopus[] => {
  const octopi = input.split('\n').map((row, i) => row.split('').map((x, j) => new Octopus(Number(x), i, j)));
  octopi.forEach((row, i) => row.forEach((octopus, j) => {
    octopus.adj = [
      octopi[i+1] && octopi[i+1][j - 1], 
      octopi[i+1] && octopi[i + 1][j], 
      octopi[i+1] && octopi[i + 1][j + 1], 
      octopi[i] && octopi[i][j + 1], 
      octopi[i][j - 1], 
      octopi[i - 1] && octopi[i - 1][j - 1], 
      octopi[i - 1] && octopi[i - 1][j], 
      octopi[i - 1] && octopi[i - 1][j + 1]
    ].filter(x => x);
  }));

  return octopi.flat();
};

export const partOne = (input: Octopus[]) => {
  input.forEach(x => x.reset());
  for (let i = 0; i < 100; i++) {
    input.forEach(x => x.hasPulsed = false);
    input.forEach(x => x.increment());
  }
  return input.reduce((acc, curr) => acc + curr.pulses, 0);
};

export const partTwo = (input: Octopus[]) => {
  input.forEach(x => x.reset());
  let i = 0;
  while(true) {
    input.forEach(x => x.hasPulsed = false);
    input.forEach(x => x.increment());
    if (!input.filter(x => !x.hasPulsed).length) {
      return i + 1;
    }
    i++;
  }
};
