import { get, set } from "lodash";
import IntCodeComputer from "../../utils/IntCode";

function combinations(array) {
  var fn = function(active, rest, a) {
    if (!rest.length) {
      a.push(active);
    } else {
      for (let i = 0; i < rest.length; i++) {
        const remaining = [...rest];
        const next = remaining.splice(i, 1);
        fn([...active, ...next], remaining, a);
      }
    }
    return a;
  };
  return fn([], array, []);
}

export const partOne = input => {
  const program = input.split(",").map(Number);
  const phasesCombos = combinations([4, 3, 2, 1, 0]);
  let max = 0;
  for (let j = 0; j < phasesCombos.length; j++) {
    const phases = phasesCombos[j];
    let currentOutput = 0;
    for (let i = 0; i < 5; i++) {
      const computer = new IntCodeComputer([...program],[phases[i], currentOutput]);
      currentOutput = computer.run().output();
    }
    if (currentOutput > max) {
      max = currentOutput;
    }
  }
  return max;
};

 
export const partTwo = input => {
  const program = input.split(",").map(Number);
  const phasesCombos = combinations([5, 6, 7, 8, 9]);
  let max = 0;
  for (let i = 0; i < phasesCombos.length; i++) {
    const phases = phasesCombos[i];
    const A = new IntCodeComputer(program, [phases[0]]);
    const iterA = A.iter();
    const B = new IntCodeComputer(program, [phases[1]]);
    const iterB = B.iter();
    const C = new IntCodeComputer(program, [phases[2]]);
    const iterC = C.iter();
    const D = new IntCodeComputer(program, [phases[3]]);
    const iterD = D.iter();
    const E = new IntCodeComputer(program, [phases[4]]);
    const iterE = E.iter();
    let someHalt = false;
    let prev = 0;
    do {
      A.addInputs([prev]);
      B.addInputs([iterA.next().value])
      C.addInputs([iterB.next().value]);
      D.addInputs([iterC.next().value]);
      E.addInputs([iterD.next().value]);
      prev = iterE.next().value || prev;
      someHalt = A.isHalt() || B.isHalt() || C.isHalt() || D.isHalt() || E.isHalt();
    } while (!someHalt);
    max = Math.max(max, prev);
  }
  return max;
};
