function gameboard(initialSize = 10) {
  const size = initialSize;

  function createBoard() {
    const arr = [];

    for (let y = 0; y < size; y++) {
      arr[y] = [];
      for (let x = 0; x < size; x++) {
        arr[y][x] = null;
      }
    }

    return arr;
  }
  const board = createBoard();

  function getSquare(x, y) {
    if (y >= 0 && y < board.length && x >= 0 && x < board[y].length) {
      return board[y][x];
    }

    throw new Error('Coordinate out of bounds');
  }

  return {
    getSquare,
  };
}

module.exports = gameboard;
