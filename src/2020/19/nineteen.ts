import { memo } from "../../utils/memo";

interface IInput {
  messages: string[];
  rules: Record<string, string>;
}

export const processInput = (input: string): IInput => {
  const parts = input.split('\n\n');
  const messages = parts[1].split('\n');
  const rules = parts[0].split('\n').reduce<Record<string,string>>((prev, x) => {
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

const computeRules = memo((value: string, rules: Record<string, string>): string => {
  if (/[a-z]+/.test(value)) {
    return value;
  } else if (value.includes('|')) {
      return `(${value.split(' | ').map(opt => computeRules(opt, rules)).join('|')})`;
  } else {
    const keys = value.split(' ');
    if (keys.length > 1) {
      return keys.map(key => {
        return computeRules(rules[key], rules)
      }).join(''); 
    } else {
      return computeRules(rules[keys[0]], rules);
    }
  }
}, (value) => value);

export const partOne = ({ rules, messages }: IInput) => {
  computeRules.cache.clear();
  const regex = new RegExp(`^${computeRules(rules["0"], rules)}$`);
  return messages.filter((x: string) => x.match(regex)).length;
};

export const partTwo = ({ rules, messages }: IInput) => {
  // Reset Cache
  computeRules.cache.clear();

  // Compute Initial Rules
  computeRules(rules["0"], rules);

  // Fetch & Modify Computed Rules
  const group42 = `${computeRules(rules["42"], rules)}+`
  const group31 = computeRules(rules["31"], rules);

  // Clear Cache & Set New Cached Values
  computeRules.cache.clear();
  computeRules.cache.set('42 31', `(${group42}(${group42}(${group42}(${group42}(${group42}(${group42}${group31})?${group31})?${group31})?${group31})?${group31})?${group31})`);
  computeRules.cache.set('42', group42);

  const regex = new RegExp(`^${computeRules(rules["0"], rules)}$`);
  return messages.filter((x: string) => x.match(regex)).length;
};