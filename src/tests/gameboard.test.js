import gameboard from '../factories/gameboard';
import events from '../events';

jest.mock('../events');

let myBoard;

beforeEach(() => {
  myBoard = gameboard();
});

test('Create a board', () => {
  expect(myBoard).toHaveProperty('board');
  expect(myBoard.board).toHaveProperty('player');
  expect(myBoard.board).toHaveProperty('enemy');
});

test('Initial board is filled with nulls', () => {
  expect(myBoard.board.player[0][0]).toBeNull();
  expect(myBoard.board.enemy[9][4]).toBeNull();
});

test('Place a ship at specific coordinate', () => {
  myBoard.placeShip(3, 2, 'player');
  expect(myBoard.board.player[3][2]).toHaveProperty('hits');
});

test('New placed ships aren`t sunk', () => {
  myBoard.placeShip(4, 5, 'enemy');
  const myShip = myBoard.board.enemy[4][5];

  expect(myShip.isSunk()).toBe(false);
});

test('Board should be able to receive attacks', () => {
  expect(myBoard.receiveAttack(5, 2, 'player')).toBeDefined();
});

test('Attacking a ship should return true', () => {
  myBoard.placeShip(3, 1, 'player');
  myBoard.placeShip(5, 4, 'player');
  const message = myBoard.receiveAttack(3, 1, 'player');

  expect(message).toBe(true);
  expect(message).not.toBe('Game over');
});

test('Attacking an empty square should return false', () => {
  expect(myBoard.receiveAttack(2, 1, 'player')).toBe(false);
});

test('Shooting the same place twice should return null', () => {
  expect(myBoard.receiveAttack(3, 2, 'player')).not.toBeNull();
  expect(myBoard.receiveAttack(3, 2, 'player')).toBeNull();
  expect(myBoard.receiveAttack(3, 2, 'enemy')).not.toBeNull();
  expect(myBoard.receiveAttack(3, 2, 'enemy')).toBeNull();
});

test('playerAttack event triggers receiveAttack', () => {
  const spyOnEvents = jest.spyOn(events, 'on');

  events.emit('playerAttack', 1, 3, 'enemy');

  expect(spyOnEvents).toHaveBeenCalledWith('playerAttack', myBoard.receiveAttack);
});
