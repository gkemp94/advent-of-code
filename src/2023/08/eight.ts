export const processInput = (input: string) => {
  const [instructions, map] = input.split("\n\n");
  return {
    instructions: instructions.split(""),
    map: map.split("\n").reduce<Record<string, Record<string, any>>>((acc, curr) => {
      const [node, directions] = curr.split(" = ");
      acc[node] = {
        L: directions.split(",")[0].replace(/\(/g, "").trim(),
        R: directions.split(",")[1].replace(/\)/g, "").trim(),
      };
      return acc;
    }, {}),
  };
};

export const partOne = ({ instructions, map }: ReturnType<typeof processInput>) => {
  let steps = 0;
  let currentNode = "AAA";
  while (currentNode !== "ZZZ") {
    const dir = instructions[steps % instructions.length];
    currentNode = map[currentNode][dir];
    steps++;
  }
  return steps;
};

const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

export const partTwo = ({ instructions, map }: ReturnType<typeof processInput>) => {
  let steps = 0;
  let currentNodes = Object.keys(map).filter((x) => x.endsWith("A"));
  let m = new Array(currentNodes.length).fill(null);
  while (true) {
    const dir = instructions[steps % instructions.length];
    steps++;
    for (let i = 0; i < currentNodes.length; i++) {
      currentNodes[i] = map[currentNodes[i]][dir];
      if (currentNodes[i].endsWith("Z") && !m[i]) {
        m[i] = steps;
      }
    }
    if (m.every((x) => x)) {
      return m.reduce(lcm);
    }
  }
};
