export default class IntCodeComputer {
  constructor(program, inputs = []) {
    this.program = [...program];
    this.pointer = 0;
    this.halt = false;
    this.inputs = inputs;
    this.outputs = [];
  }

  getValue(program, params, pointer) {
    return [0, 1].map((x) => program[
      params[x] === 0 
        ? program[pointer + x + 1]
        : pointer + x + 1
    ]);
  }

  isHalt() {
    return this.halt;
  }

  addInputs(inputs) {
    this.inputs = [...this.inputs, ...inputs.filter(x => x !== undefined)];
  }

  output() {
    return this.outputs[this.outputs.length - 1];
  }

  * iter() {
    do {
      const { pointer, program } = this;
      const cmd = `${program[pointer]}`.padStart(5, '0');
      const opCode = Number(cmd.substr(3));
      const params = cmd.substr(0, 3).split('').reverse().map(Number);
      const [a, b] = this.getValue(program, params, pointer);
      switch(opCode) {
        case 1: { // Add
          program[program[pointer+3]] = a + b;
          this.pointer += 4;
          break;
        }
        case 2: { // Multilpy
          program[program[pointer+3]] = a * b;
          this.pointer += 4;
          break;
        }
        case 3: { // Input
          // console.log(this.inputs);
          program[program[pointer+1]] = this.inputs.shift();
          this.pointer += 2;
          break;
        };
        case 4: { // Output
          yield a;
          this.pointer += 2;
          break
        };
        case 5: { // Jump If True
          if (a !== 0) {
            this.pointer = b;
            break;
          }
          this.pointer += 3
          break;
        }
        case 6: { // Jump If False
          if (a === 0) {
            this.pointer = b;
            break;
          }
          this.pointer += 3
          break;
        }
        case 7: { // Less Than
          if (a < b) {
            program[program[pointer+3]] = 1;
          } else {
            program[program[pointer+3]] = 0;
          }
          this.pointer += 4
          break;
        }
        case 8: { // Equal
          if (a === b) {
            program[program[pointer+3]] = 1;
          } else {
            program[program[pointer+3]] = 0;
          }
          this.pointer += 4
          break;
        }
        case 99:
        default:
          this.halt = true;
      }
    } while(!this.halt)
  }

  run() {
    let iter = this.iter();
    do {
      const output = iter.next().value;
      if (output) this.outputs.push(output);
    } while (!this.halt)
    return this;
  }
}