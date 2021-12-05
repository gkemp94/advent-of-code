export const processInput = (input: string): number[] => {
  return input.split('\n').map(x => parseInt(x))
};

export const handshake = (subjectNumber: number, loopSize: number): number => {
  let val = 1;
  while (loopSize) {
    val = (subjectNumber * val) % 20201227;
    loopSize--;
  }
  return val;
}

export const partOne = (input: number[]) => {
  const subjectNumber = 7;
  const [cardPublicKey, doorPublicKey] = input;

  let cardLoopSize = 0;
  let cardValue = 1;

  while (cardValue !== cardPublicKey) {
    cardValue = (cardValue * subjectNumber) % 20201227;
    cardLoopSize++;
  };

  let doorLoopSize = 0;
  let doorValue = 1;

  while (doorValue !== doorPublicKey) {
    doorValue = (doorValue * subjectNumber) % 20201227;
    doorLoopSize++;
  };

  return handshake(doorPublicKey, cardLoopSize);  
};