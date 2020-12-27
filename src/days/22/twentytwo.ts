import { memo } from "../../utils/memo";

export const processInput = (input: string): number[][] => {
  return input.split('\n\n').map(x => {
    return x.replace(/Player [0-9]+:/, '').trim().split('\n').map(x => parseInt(x));
  });
};

export const partOne = (input: number[][]) => {
  const [one, two] = JSON.parse(JSON.stringify(input));
  while (one.length && two.length) {
    const playerOneCard = one.shift()!;
    const playerTwoCard = two.shift()!;
    if (playerOneCard > playerTwoCard) {
      one.push(playerOneCard, playerTwoCard);
    } else {
      two.push(playerTwoCard, playerOneCard);
    }
  }
  return calculateScore((one.length ? one : two));
}

const calculateScore = (arr: number[]) => {
  return arr.reduce((prev, curr, i, f) => {
    return prev + (curr * (f.length - i));
  }, 0);
}

export const play = memo((input: number[][]) => {
  const [one, two] = JSON.parse(JSON.stringify(input));
  const seen = new Set();

  while (one.length && two.length) {
    // Infinite Game Protection Rule
    if (seen.has(JSON.stringify([one, two]))) {
      return { winner: 1, score: calculateScore(one) };
    } else {
      seen.add(JSON.stringify([one, two]));
    }

    const oneCard = one.shift()!;
    const twoCard = two.shift()!;

    if (oneCard <= one.length && twoCard <= two.length) {
      const { winner } = play([
          one.slice(0, oneCard),
          two.slice(0, twoCard),
        ]
      )
      if (winner === 1) {
        one.push(oneCard, twoCard);
      } else {
        two.push(twoCard, oneCard);
      }
    } else if (oneCard > twoCard) {
      one.push(oneCard, twoCard);
    } else {
      two.push(twoCard, oneCard);
    }
  }

  return { winner: one.length ? 1 : 2, score: calculateScore(one.length ? one : two) };
});

export const partTwo = (input: number[][]) => {
  return play(input).score;
};