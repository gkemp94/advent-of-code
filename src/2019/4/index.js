export const isValid = (pwd, noGroups = false) => {
  const tokens = `${pwd}`.split('').map(Number);
  let isValid = false;
  for (let i = 1; i < tokens.length; i++) {
    if (tokens[i] < tokens[i-1]) {
      return false;
    }
    if (tokens[i] === tokens[i-1]) {
      if (!noGroups) {
        isValid = true;
      } else if (!(i >= 2 && tokens[i-2] === tokens[i]) && !(tokens[i+1] === tokens[i])) {
        isValid = true
      }
    }
  }
  return isValid;
};

const getValidPasswordCount = (input, noGroups = false) => {
  const [start, end] = input.split('-').map(Number);
  let validPasswords = 0;
  for (let i = start; i < end; i++) {
    if (isValid(i, noGroups)) validPasswords++;
  }
  return validPasswords;
};

export const partOne = (input) => getValidPasswordCount(input);

export const partTwo = (input) => getValidPasswordCount(input, true);