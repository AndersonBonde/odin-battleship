const ship = require('./ship');

function gameboard(initialSize = 10) {
  const size = initialSize;
  const shots = [];

  function createBoard() {
    const arr = [];

    for (let row = 0; row < size; row++) {
      arr[row] = [];
      for (let column = 0; column < size; column++) {
        arr[row][column] = null;
      }
    }

    return arr;
  }
  const board = createBoard();

  // Returns what's contained in the given coordinate;
  function getSquare(column, row) {
    if (row >= 0 && row < board.length && column >= 0 && column < board[row].length) {
      return board[row][column];
    }

    throw new Error('Coordinate out of bounds');
  }

  function placeShip(column, row) {
    const newShip = ship();

    board[row][column] = newShip;
  }

  // Check if the given coordinate has already been shot;
  function checkShot(column, row) {
    for (let i = 0; i < shots.length; i++) {
      const cur = shots[i];

      if (cur[0] === column && cur[1] === row) return true;
    }

    return false;
  }

  function receiveAttack(column, row) {
    if (checkShot(column, row)) return false;
    const ship = board[row][column] !== null ? board[row][column] : false;

    if (ship) {
      ship.hit();
    }
    shots.push([column, row]);

    return true;
  }

  return {
    getSquare,
    placeShip,
    receiveAttack,
  };
}

module.exports = gameboard;
