import { flatten } from "../../utils/flatten";
import { memo } from "../../utils/memo";


export const processInput = (input: string): any => {
  return input.split('\n').map(x => {
    const { ingredients, allergens } = x.match(/^(?<ingredients>(([a-z]+) )+)\(contains (?<allergens>(([a-z]+),? ?)+)+\)$/)!.groups!;
    return [
      ingredients.trim().split(' '),
      allergens.split(', '),
    ];
  })
};

export const union = (arrA: string[], arrB: string[]) => {
  return arrA.filter(x => arrB.includes(x));
};

export const remove = (arr: string[], item: string) => {
  ~arr.indexOf(item) && arr.splice(arr.indexOf(item), 1);
}

const solve = (input: [string[], string[]][]) => {
  input = input.sort((a, b) => {
    return a[1].length - b[1].length;
  });

  const result = new Map<string, Set<string>>();
  for (let i = 0; i < input.length; i++) {
    const [ingredients, allergens] = input[i];
    for (let j = 0; j < ingredients.length; j++) {
      const ingredient = ingredients[j];
      const potentialAllergens = allergens.filter((allergen) => {
        for (let f = 0; f < input.length; f++) {
          if (input[f][1].includes(allergen)) {
            if(!input[f][0].includes(ingredient)) {
              return false;
            }
          }
        }
        return true;
      });
      if (potentialAllergens.length) {
        if (!result.has(ingredient)) {
          result.set(ingredient, new Set());
        }
        const set = result.get(ingredient);
        potentialAllergens.forEach(x => {
          return set?.add(x);
        })
      }
    }
  }
  let isDirty = true;
  while(isDirty) {
    isDirty = false;
    result.forEach((x, k) => {
      if (x.size === 1) {
        const [item] = Array.from(x);
        result.forEach((y, key) => {
          if (key === k) return;
          if (y.has(item)) {
            isDirty = true;
            y.delete(item);
          }
        })
      }
    });
  }
  return result;
}

export const partOne = (input: [string[], string[]][]) => {

  const result = solve(input);

  return flatten(input.reduce<any>((prev, curr) => {
    return [...prev, curr[0]]
  }, [])).filter((x: string) => !result.has(x)).length;
}

export const partTwo = (input: [string[], string[]][]) => {
  const result = solve(input);
  const final: [string, string][] = [];

  result.forEach((x, key) => {
    const [item] = Array.from(x);
    final.push([item, key]);
  });

  return final.sort((a, b) => a[0] > b[0] ? 1 : -1).map(([_, ing]) => ing).join(',');
};