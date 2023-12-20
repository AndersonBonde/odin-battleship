import gameboard from '../factories/gameboard';
import events from '../events';

jest.mock('../events');

test('Create a board', () => {
  const myBoard = gameboard();

  expect(myBoard).toHaveProperty('board');
  expect(myBoard.board).toHaveProperty('player');
  expect(myBoard.board).toHaveProperty('enemy');
});

test('Initial board is filled with nulls', () => {
  const myBoard = gameboard();

  expect(myBoard.board.player[0][0]).toBeNull();
  expect(myBoard.board.enemy[9][4]).toBeNull();
});

test('Place a ship at specific coordinate', () => {
  const myBoard = gameboard();

  myBoard.placeShip(3, 2, 'player');
  expect(myBoard.board.player[3][2]).toHaveProperty('hits');
});

test('New placed ships aren`t sunk', () => {
  const myBoard = gameboard();

  myBoard.placeShip(4, 5, 'enemy');
  const myShip = myBoard.board.enemy[4][5];

  expect(myShip.isSunk()).toBeFalsy();
});

test('Board should be able to receive attacks', () => {
  const myBoard = gameboard();

  expect(myBoard.receiveAttack(5, 2, 'player')).toBeDefined();
});

test('Attacking a ship should return true', () => {
  const myBoard = gameboard();

  myBoard.placeShip(3, 1, 'player');
  myBoard.placeShip(5, 4, 'player');
  const message = myBoard.receiveAttack(3, 1, 'player');

  expect(message).toBeTruthy();
  expect(message).not.toBe('Game over');
});

test('Attacking an empty square should return false', () => {
  const myBoard = gameboard();

  expect(myBoard.receiveAttack(2, 1, 'player')).toBeFalsy();
});

test('Shooting the same place twice should return null', () => {
  const myBoard = gameboard();

  expect(myBoard.receiveAttack(3, 2, 'player')).not.toBeNull();
  expect(myBoard.receiveAttack(3, 2, 'player')).toBeNull();
  expect(myBoard.receiveAttack(3, 2, 'enemy')).not.toBeNull();
  expect(myBoard.receiveAttack(3, 2, 'enemy')).toBeNull();
});

test('playerAttack event triggers receiveAttack', () => {
  const myBoard = gameboard();
  const spyOnEvents = jest.spyOn(events, 'on');

  events.emit('playerAttack', 1, 3, 'enemy');

  expect(spyOnEvents).toHaveBeenCalledWith('playerAttack', myBoard.receiveAttack);
});
