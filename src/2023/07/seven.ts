export const processInput = (input: string): [string[], number][] => {
  return input.split("\n").map((line) => {
    const [card, points] = line.split(" ");
    return [card.split(""), Number(points)];
  });
};

const CARD_POWER = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const CARD_POWER_W_JOKER = ["J", "1", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

export const partOne = (input: ReturnType<typeof processInput>) => {
  return input
    .map(([cards, points]) => {
      const cardMap = cards.reduce<Record<string, number>>((acc, curr) => {
        acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
        return acc;
      }, {});

      const values = Object.values(cardMap);

      let power = 0;

      if (values.some((x) => x === 5)) {
        power = 6;
      } else if (values.some((x) => x === 4)) {
        power = 5;
      } else if (values.some((x) => x === 3) && values.some((x) => x === 2)) {
        power = 4;
      } else if (values.some((x) => x === 3)) {
        power = 3;
      } else if (values.filter((x) => x === 2).length === 2) {
        power = 2;
      } else if (values.filter((x) => x === 2).length === 1) {
        power = 1;
      }

      return { cards, points, cardMap, power };
    })
    .sort((a, b) => {
      if (a.power > b.power) {
        return 1;
      } else if (a.power < b.power) {
        return -1;
      }
      for (let i = 0; i < a.cards.length; i++) {
        if (CARD_POWER.indexOf(a.cards[i]) > CARD_POWER.indexOf(b.cards[i])) {
          return 1;
        } else if (CARD_POWER.indexOf(a.cards[i]) < CARD_POWER.indexOf(b.cards[i])) {
          return -1;
        }
      }
      return 0;
    })
    .reduce((acc, { points }, i) => {
      return acc + points * (i + 1);
    }, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  return input
    .map(([cards, points]) => {
      let Js = 0;
      let maxNum = -Infinity;
      let maxChar: string = "";
      const cardMap = cards.reduce<Record<string, number>>((acc, curr) => {
        if (curr === "J") {
          Js++;
          return acc;
        }
        acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
        if (acc[curr] > maxNum) {
          maxChar = curr;
          maxNum = acc[curr];
        }
        return acc;
      }, {});

      if (!maxChar) {
        console.log(cards, maxChar, maxNum);
        cardMap["A"] = Js;
      } else {
        cardMap[maxChar] += Js;
      }

      const values = Object.values(cardMap);

      let power = 0;

      if (values.some((x) => x === 5)) {
        power = 6;
      } else if (values.some((x) => x === 4)) {
        power = 5;
      } else if (values.some((x) => x === 3) && values.some((x) => x === 2)) {
        power = 4;
      } else if (values.some((x) => x === 3)) {
        power = 3;
      } else if (values.filter((x) => x === 2).length === 2) {
        power = 2;
      } else if (values.filter((x) => x === 2).length === 1) {
        power = 1;
      }

      return { cards, points, cardMap, power };
    })
    .sort((a, b) => {
      if (a.power > b.power) {
        return 1;
      } else if (a.power < b.power) {
        return -1;
      }
      for (let i = 0; i < a.cards.length; i++) {
        if (CARD_POWER_W_JOKER.indexOf(a.cards[i]) > CARD_POWER_W_JOKER.indexOf(b.cards[i])) {
          return 1;
        } else if (CARD_POWER_W_JOKER.indexOf(a.cards[i]) < CARD_POWER_W_JOKER.indexOf(b.cards[i])) {
          return -1;
        }
      }
      return 0;
    })
    .reduce((acc, { points }, i) => {
      return acc + points * (i + 1);
    }, 0);
};
