export const one = (input) => {
  return input.reduce((curr, x) => x + curr);
};

export const two = (inputs) => {;
  const seen = [0];
  let curr = 0;
  let i = 0;
  while (true) {
    curr = curr + inputs[i % inputs.length];
    if (~seen.indexOf(curr)) return curr;
    seen.push(curr);    
    i++;
  }
}
