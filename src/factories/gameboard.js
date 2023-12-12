function gameboard(width = 10, height = 10) {
  const boardSize = {
    width: Math.max(10, width),
    height: Math.max(6, height),
  };

  const board = {
    player: [],
    enemy: [],
  };

  board.player = initializeBoard();
  board.enemy = initializeBoard();

  function initializeBoard() {
    const arr = [];

    for (let i = 0; i < boardSize.width; i++) {
      arr[i] = [];

      for (let j = 0; j < boardSize.height; j++) {
        arr[i][j] = null;
      }
    }

    return arr;
  }

  return {
    get board() { return board; },
  };
}

export default gameboard;
