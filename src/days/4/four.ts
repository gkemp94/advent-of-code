export const processInput = (input: string): Record<string,string>[] => {
  return input.split('\n\n').map(x => x.split(/[\n\s]/).reduce((curr: Record<string, string>, y) => {
    const [key, value] = y.split(':');
    curr[key] = value;
    return curr;
  }, {}));
};

const containsAll = (obj: Record<string, any>, requiredKeys: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']) => {
  return requiredKeys.every(key => Object.keys(obj).includes(key));
};

export const partOne = (input: Record<string, string>[]) => {
  return input.filter(x => containsAll(x)).length;
};

export const partTwo = (input:  Record<string, string>[]) => {
  return input.filter(item => {
    if (!containsAll(item)) return false;
    if (parseInt(item.byr) < 1920 || parseInt(item.byr) > 2002) return false;
    if (parseInt(item.iyr) < 2010 || parseInt(item.iyr) > 2020) return false;
    if (parseInt(item.eyr) < 2020 || parseInt(item.eyr) > 2030) return false;
    if (!item.hgt.match(/cm/) && !item.hgt.match(/in/)) return false;
    if (item.hgt.match(/cm/) && (parseInt(item.hgt) < 150 || parseInt(item.hgt) > 193)) return false;
    if (item.hgt.match(/in/) && (parseInt(item.hgt) < 59 || parseInt(item.hgt) > 79)) return false;
    if (!item.hcl.match(/#[0-9a-f]{6}/)) return false;
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(item.ecl)) return false;
    if (!item.pid.match(/^[0-9]{9}$/)) return false;
    return true;
  }).length; 
};
