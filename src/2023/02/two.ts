export const processInput = (input: string) => {
  return input.split("\n").map((game) => {
    const [gameId, turnsStr] = game.split(": ");
    const id = Number(gameId.split(" ")[1]);
    const turns = turnsStr.split("; ").map((turn) => {
      return turn.split(", ").reduce<Record<string, number>>(
        (acc, curr) => {
          const [key, value] = curr.split(" ");
          return { ...acc, [value]: Number(key) };
        },
        { green: 0, red: 0, blue: 0 }
      );
    });
    return { id, turns };
  });
};

export const partOne = (input: ReturnType<typeof processInput>, r: number, g: number, b: number) => {
  return input.reduce((acc, game) => {
    const valid = game.turns.every((turn) => turn.green <= g && turn.red <= r && turn.blue <= b);
    if (valid) {
      return acc + game.id;
    }
    return acc;
  }, 0);
};

export const partTwo = (input: ReturnType<typeof processInput>) => {
  return input.reduce((acc, game) => {
    const { red, green, blue } = game.turns.reduce(
      (acc, turn) => {
        return {
          red: Math.max(acc.red, turn.red),
          green: Math.max(acc.green, turn.green),
          blue: Math.max(acc.blue, turn.blue),
        };
      },
      { red: 0, green: 0, blue: 0 }
    );
    return acc + red * green * blue;
  }, 0);
};
