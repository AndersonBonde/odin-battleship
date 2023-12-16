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

  const ships = {
    player: [],
    enemy: [],
  };

  // Helper function so the computer can pick a target;
  function fillPossibleTargets() {
    const arr = [];

    for (let i = 0; i < boardSize.width; i++) {
      for (let j = 0; j < boardSize.height; j++) {
        arr.push({ x: i, y: j });
      }
    }

    return arr;
  }

  const possibleTargets = fillPossibleTargets();

  function pickRandomSquare() {
    const randomIndex = Math.floor(Math.random() * possibleTargets.length);
    const value = possibleTargets[randomIndex];

    possibleTargets.splice(randomIndex, 1);

    return value;
  }

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
    const hitSquare = board[target][x][y];

    // Check if hitSquare is 1, meaning that square was already shot, return null if yes;
    if (hitSquare === 1) {
      return null;
    }
    // Null means that square is empty and wasn't shot yet, change to 1 and return false;
    if (hitSquare === null) {
      board[target][x][y] = 1;
      return false;
    }
    // Not the previous two choices means a ship was hit;
    hitSquare.hit();
    board[target][x][y] = 1;

    if (allShipsSunk(target)) {
      //  TODO: message the game to end;

      return 'Game over';
    }

    return true;
  }

  return {
    get board() { return board; },
    placeShip,
    receiveAttack,
    pickRandomSquare,
  };
}

export default gameboard;
