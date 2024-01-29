const gameboard = require('../factories/gameboard');

let myBoard;

beforeEach(() => {
  myBoard = gameboard();
});

test('Initial board is filled with nulls', () => {
  expect(myBoard.getSquare(0, 0)).toBe(null);
  expect(myBoard.getSquare(9, 9)).toBe(null);
});

test('Trying to access a coordinate out of bounds should throw an error', () => {
  expect(() => myBoard.getSquare(10, 0)).toThrow(Error);
  expect(() => myBoard.getSquare(2, 12)).toThrow(Error);
});

test('It"s possible to place a ship at a specific coordinate', () => {
  myBoard.placeShip(1, 2);
  expect(myBoard.getSquare(1, 2)).not.toBe(null);
  expect(myBoard.getSquare(1, 2)).toHaveProperty('hit');
});

test('Newly places ship is not sunk', () => {
  myBoard.placeShip(3, 4);
  const ship = myBoard.getSquare(3, 4);
  expect(ship).not.toBe(null);
  expect(ship.isSunk()).toBe(false);
});

test('Gameboard should be able to receive attacks', () => {
  expect(myBoard.receiveAttack(1, 2)).toBe(true);
});

test('Gameboard shouldn"t be able to receive two attacks in the same square', () => {
  expect(myBoard.receiveAttack(1, 2)).toBe(true);
  expect(myBoard.receiveAttack(1, 2)).toBe(false);
});

test('Ship with size 1 should be sunk after receiving 1 attack', () => {
  myBoard.placeShip(1, 2);
  const ship = myBoard.getSquare(1, 2);
  expect(ship.isSunk()).toBe(false);
  myBoard.receiveAttack(1, 2);
  expect(ship.isSunk()).toBe(true);
});
