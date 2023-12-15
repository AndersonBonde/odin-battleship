import ship from './ship';

function gameboard(width = 10, height = 10) {
  const boardSize = {
    width: Math.max(10, width),
    height: Math.max(6, height),
  };

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

  const board = {
    player: [],
    enemy: [],
  };

  board.player = initializeBoard();
  board.enemy = initializeBoard();

  const shot = {
    player: [],
    enemy: [],
  };

  shot.player = initializeBoard();
  shot.enemy = initializeBoard();

  const ships = {
    player: [],
    enemy: [],
  };

  function placeShip(x, y, target) {
    // TODO: Only size 1 ships for now, increase later;
    const newShip = ship(1);
    board[target][x][y] = newShip;
    ships[target].push(newShip);
  }

  function allShipsSunk(target) {
    if (ships[target].every((cur) => cur.isSunk())) return true;

    return false;
  }

  function receiveAttack(x, y, target) {
    // Check if square was already shot, return null if yes;
    if (shot[target][x][y] !== null) return null;

    shot[target][x][y] = 1;
    const hitSquare = board[target][x][y];
    if (hitSquare !== null) {
      hitSquare.hit();

      if (allShipsSunk(target)) {
        // TODO: message the game to end;

        return 'Game over';
      }

      return true;
    }

    return false;
  }

  return {
    get board() { return board; },
    placeShip,
    receiveAttack,
  };
}

export default gameboard;
