export const processInput = (input: string): [number, string[]] => {
  return input.split('\n').map((x, i) => {
    return i === 0 ? parseInt(x) : x.split(',');
  }) as [number, string[]];
};

export const partOne = ([timestamp, schedule]: [number, string[]]) => {
  let tMin = Number.POSITIVE_INFINITY;
  let id = null;
  for (let i = 0; i < schedule.length; i++) {
    const t = parseInt(schedule[i]);
    if (!t) continue;
    if (t - (timestamp % t) < tMin) {
      tMin = t - (timestamp % t);
      id = t;
    }
  }
  return id! * tMin;
};

export const partTwo = (input: string[]) => {
  const schedules = input.map((x, i) => [parseInt(x), i]).filter(([x]) => x);
  const num = schedules.map(([x]) => x);
  const rem = schedules.map(([x, y]) => x - y);
  return findMinX(num, rem).toString();
};

const inv = (a: number, m: number) => {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  while (a > 1) {
    let q = Math.floor(a / m);
    let t = m;
    m = a % m;
    a = t;

    t = x0;

    x0 = x1 - (q * x0);

    x1 = t;
    
    while (x1 < 0) {
      x1 = x1 + m0;
    }
  }
  return x1;
};

const findMinX = (num: number[], rem: number[]) => {
  const prod = num.reduce((prev, curr) => prev * curr, 1);

  let result = BigInt(0);

  for (let j = 0; j < num.length; j++) {
    let pp = Math.floor(prod / num[j]);
    result = result + BigInt(rem[j]) * BigInt(inv(pp, num[j])! * pp);
  }

  return result % BigInt(prod);
};