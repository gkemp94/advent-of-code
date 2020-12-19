import { memo } from "../../utils/memo";

interface IInput {
  messages: string[];
  rules: any;
}

export const processInput = (input: string): IInput => {
  const parts = input.split('\n\n');
  const messages = parts[1].split('\n');
  const rules = parts[0].split('\n').reduce<Record<string,any>>((prev, x) => {
    const [index, rule] = x.split(': ');
    if (rule.includes("\"")) {
      prev[index] = rule.replace(/"/g, '');
    } else {
      prev[index] = rule;
    }

    return prev;
  }, {});
  return { messages, rules }
};

const computeRules = memo((value: string, rules: any, partTwo = false): string => {
  if (/[a-z]+/.test(value)) {
    return value;
  } else if (value.includes('|')) {
      return `(${value.split(' | ').map(opt => computeRules(opt, rules, partTwo)).join('|')})`;
  } else {
    const keys = value.split(' ');
    return keys.map(key => {
      if (key === "8") {
        return `(${computeRules(rules["42"], rules, partTwo)})+`;
      }
      return computeRules(rules[key], rules, partTwo)
    }).join('');
  }
})

export const partOne = ({ rules, messages }: any) => {
  const regex = new RegExp(`^${computeRules(rules["0"], rules)}$`);
  return messages.filter((x: string) => x.match(regex)).length;
};

export const partTwo = ({ rules, messages }: any) => {
  rules["8"] = "42 | 42 8";
  rules["11"] = "42 31 | 42 11 31";
};