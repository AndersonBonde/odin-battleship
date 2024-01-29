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
