type Board = [number, boolean][][];
interface PuzzleInput {
  order: number[];
  boards: Board[]
}

export const processInput = (input: string): PuzzleInput => {
  const [order, ...boards] = input.split('\n\n');
  return {
    order: order.split(',').map(Number),
    boards: boards.map(board => board.split('\n').map(row => row.trim().split(' ').filter(x => x).map(x => ([Number(x), false])))),
  }
};

export const playBingo = ({ boards, order }: PuzzleInput, last = false) => {
  for (let i = 0; i < order.length; i++) {
    // Add Numbers to Board
    boardLoop:
      for (let j = 0; j < boards.length; j++) {
        const board = boards[j];

        for (let k = 0; k < board.length; k++) {
          const row = board[k];
          for (let l = 0; l < row.length; l++) {
            const cell = row[l];
            if (order[i] === cell[0]) {
              cell[1] = true;

              // Check to See if this board has won
              const hasWon = 
                row.reduce((acc: boolean, curr) => curr[1] && acc, true)
                || board.reduce((acc: boolean, row) => row[l][1] && acc, true);

              if (hasWon) {
                if (!last) {
                  return board.flat(1).reduce((acc, [number, isMarked]) => isMarked ? acc : number + acc, 0) * order[i]; 
                }
                if (boards.length === 1) {
                  return boards[0].flat(1).reduce((acc, [number, isMarked]) => isMarked ? acc : number + acc, 0) * order[i];
                }
                boards.splice(j, 1);
                j--;
                continue boardLoop;
              }
            }
          }
        }
      }
  }
}

export const partOne = (input: PuzzleInput) => playBingo(input);
export const partTwo = (input: PuzzleInput) => playBingo(input, true);
