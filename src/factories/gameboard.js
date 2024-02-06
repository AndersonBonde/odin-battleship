const ship = require('./ship');

function gameboard(gameboardDOM) {
  const size = 10;
  const tableDOM = gameboardDOM;
  const possibleShots = [];
  const ships = [];

  function createBoard() {
    const arr = [];

    for (let row = 0; row < size; row++) {
      arr[row] = [];
      for (let column = 0; column < size; column++) {
        arr[row][column] = null;
        possibleShots.push({ column, row });
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

    return false;
  }

  function placeShip(column, row, shipSize = 1) {
    const newShip = ship({ column, row }, shipSize);

    for (let i = 0; i < shipSize; i++) {
      if (getSquare(+column + i, row) != null) {
        // Ship can't be placed message
        return false;
      }
    }

    for (let i = 0; i < shipSize; i++) {
      board[row][+column + i] = newShip;
    }

    ships.push(newShip);
    return true;
  }

  function removeShip(column, row) {
    ships.forEach((ship, idx) => {
      if (ship.pos.column == column && ship.pos.row == row) ships.splice(idx, 1);
    });
    board[row][column] = null;
  }

  function squareCanBeShot(column, row) {
    for (let i = 0; i < possibleShots.length; i++) {
      const el = possibleShots[i];
      if (el.column == column && el.row == row) {
        possibleShots.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  function allShipsAreSunk() {
    return ships.every((curShip) => curShip.isSunk());
  }

  function paintShotSquare(column, row, color) {
    const tr = document.querySelector(`${tableDOM} tr[data-row='${row}']`);
    const td = tr.querySelector(`td[data-column='${column}']`);

    td.style.backgroundColor = color;
  }

  function receiveAttack(column, row) {
    if (!squareCanBeShot(column, row)) return false;
    const target = board[row][column];

    if (target) {
      target.hit();
      paintShotSquare(column, row, 'black');
      if (allShipsAreSunk()) return 'Game Over';
    } else {
      paintShotSquare(column, row, 'tomato');
    }

    return true;
  }

  function receiveRandomAttack() {
    const randomIdx = Math.floor(Math.random() * possibleShots.length);
    const el = possibleShots[randomIdx];

    const attack = receiveAttack(el.column, el.row);
    return attack;
  }

  function pickRandomSquare() {
    const randomIdx = Math.floor(Math.random() * possibleShots.length);
    let pos = possibleShots[randomIdx];
    if (getSquare(pos.column, pos.row) !== null) {
      pos = pickRandomSquare();
    }

    return pos;
  }

  function placeRandomShips(size1, size2, size3) {
    for (let i = 0; i < size1; i++) {
      const randomPos = pickRandomSquare();
      placeShip(randomPos.column, randomPos.row);
    }

    for (let i = 0; i < size2; i++) {
      const randomPos = pickRandomSquare();
      const placed = placeShip(randomPos.column, randomPos.row, 2);

      if (!placed) i -= 1;
    }

    for (let i = 0; i < size3; i++) {
      const randomPos = pickRandomSquare();
      const placed = placeShip(randomPos.column, randomPos.row, 3);

      if (!placed) i -= 1;
    }
  }

  return {
    get possibleShots() { return possibleShots; },
    get ships() { return ships; },
    getSquare,
    placeShip,
    removeShip,
    receiveAttack,
    receiveRandomAttack,
    placeRandomShips,
  };
}

module.exports = gameboard;
