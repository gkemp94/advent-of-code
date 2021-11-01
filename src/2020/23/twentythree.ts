export const processInput = (input: string): number[] => {
  return input.split('').map(x => parseInt(x));
};

class Cup {
  private _label: number;
  private _next?: Cup;
  constructor(label: number) {
    this._label = label;
  }
  get label() {
    return this._label;
  }
  get next() {
    return this._next!;
  }
  set(_next: Cup) {
    this._next = _next;
  }
  pick(count: number): Cup[] {
    const result = [];
    result.push(this._next!);
    for (let i = 1; i < count; i++) {
      result.push(result[result.length - 1]!._next!);
    }
    this.set(result[result.length - 1]!._next!);
    return result;
  }
  place(items: Cup[]) {
    let tmp = this._next!;
    this.set(items[0])
    items[items.length - 1].set(tmp);
  }
};

const getCups = (input: number[]) => {
  const cups = new Map<number, Cup>();

  // Create Map
  input.forEach(label => {
    cups.set(label, new Cup(label));
  });

  // Map Next
  input.forEach((label, i) => {
    const nextCup = cups.get(input[i + 1] || input[0])!;
    cups.get(label)!.set(nextCup)
  });

  return cups;
};

const getDestination = (cups: Map<number, Cup>, pickedUp: Cup[], currentCup: Cup, maxCup: number) => {
  let nextLabel = currentCup.label - 1;
  while (true) {
    if (cups.has(nextLabel) && !pickedUp.includes(cups.get(nextLabel)!)) {
      return cups.get(nextLabel);
    }
    nextLabel--;
    if (nextLabel < 0) {
      nextLabel = maxCup;
    }
  }
};

export const partOne = (input: number[]) => {
  const cups = play(input, 100);
  return parseInt(cups.get(1)?.pick(cups.size - 1).map(cup => cup.label).join('')!);
};

const play = (input: number[], rounds: number, max?: number): Map<number, Cup> => {
  const cups = getCups(input);
  const maxCup = max || Math.max(...Array.from(cups.keys()));
  let currentCup = cups.get(input[0])!;

  for (let i = 0; i < rounds; i++) {
    const pickedUp = currentCup.pick(3);
    const destination = getDestination(cups, pickedUp, currentCup, maxCup)!;
    destination.place(pickedUp);
    currentCup = currentCup.next;
  }
  return cups;
};

const generateArray = (input: number[], count: number) => {
  const array = new Array(count);
  for (let i = 0; i < count; i++) {
    array[i] = input[i] || (Math.max(...input) + (i - input.length + 1));
  }
  return array;
};

export const partTwo = (input: number[]) => {
  const size = 1000000;
  const array = generateArray(input, size);
  const cups = play(array, 10000000, size);
  return cups.get(1)?.pick(2).reduce((prev, cup) => {
    return cup.label * prev;
  }, 1);
};