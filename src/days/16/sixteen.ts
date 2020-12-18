import { flatten } from "../../utils/flatten";
import { memo } from "../../utils/memo";

interface IInput {
  rules: Record<string, number[][]>;
  myTicket: number[];
  nearbyTickets: number[][];
}

export const processInput = (input: string): IInput => {
  const splitInput = input.split('\n\n');
  const myTicket = splitInput[1].split('\n')[1].split(',').map(x => parseInt(x));
  const otherTicketsArray = splitInput[2].split('\n');
  otherTicketsArray.shift();
  const nearbyTickets = otherTicketsArray.map(x => x.split(',').map(j => parseInt(j)));
  const rules = splitInput[0].split('\n').reduce<any>((prev, curr) => {
    const [ruleName, brackets] = curr.split(': ');
    prev[ruleName] = brackets.split(' or ').map(x => x.split('-').map(x => parseInt(x)));
    return prev;
  }, {});

  return {
    rules,
    myTicket,
    nearbyTickets,
  }
};

const isValid = memo((number: number, rules: number[][]) => {
  for (let i = 0; i < rules.length; i++) {
    const [min, max] = rules[i];
    if (number >= min && number <= max) {
      return true;
    }
  }
  return false;
});

const isValidTicket = (ticket: number[], rules: number[][]) => {
  for (let i = 0; i < ticket.length; i++) {
    if (!isValid(ticket[i], rules)) {
      return false;
    }
  }
  return true;
}

export const partOne = ({ nearbyTickets, rules }: IInput, turns: number) => {
  let error = 0;
  const flattenedArray = flatten(nearbyTickets);
  const flattenedRules = Object.keys(rules).reduce<number[][]>((prev: number[][], key: string) => {
    prev.push(rules[key][0], rules[key][1]);
    return prev;
  }, []);
  

  for (let i = 0; i < flattenedArray.length; i++) {
    const number = flattenedArray[i];
    if(!isValid(number, flattenedRules)) {
      error += number;
    }
  }
  return error;
}

export const partTwo = ({ nearbyTickets, rules, myTicket }: IInput) => {
  const flattenedRules = Object.keys(rules).reduce<number[][]>((prev: number[][], key: string) => {
    prev.push(rules[key][0], rules[key][1]);
    return prev;
  }, []);
  const potentialRows = Object.keys(rules).reduce((prev, curr) => {
    prev.set(curr, new Set(Array.from(Array(myTicket.length).keys())));
    return prev;
  }, new Map<string, Set<number>>());
  const flattenedArray = nearbyTickets.filter(x => isValidTicket(x, flattenedRules));

  for (let i = 0; i < flattenedArray.length; i++) {
    const ticket = flattenedArray[i];
    for (let j = 0; j < ticket.length; j++) {
      const number = ticket[j];
      for (let k = 0; k < Object.keys(rules).length; k++) {
        const [[min1, max1], [min2, max2]] = rules[Object.keys(rules)[k]];
        if (!((number >= min1 && number <= max1) || (number >= min2 && number <= max2))) {
          potentialRows.get(Object.keys(rules)[k])?.delete(j);
        }
      }
    }
  }

  let isDirty = true;
  while (isDirty) {
    isDirty = false;
    potentialRows.forEach(x => {
      if (x.size === 1) {
        const [a] = Array.from(x);
        potentialRows.forEach(y => {
          if (y !== x) {
            y.delete(a);
          }
        })
      } else {
        isDirty = true;
      }
    })
  }

  let result = 1;
  potentialRows.forEach((val, key) => {
    if (key.includes("departure")) {
      const [a] = Array.from(val);
      result = result * myTicket[a];
    }
  })
  return result;
};