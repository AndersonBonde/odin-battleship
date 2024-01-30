const player = require('../factories/player');

const mockMyBoard = {
  receiveRandomAttack: jest.fn(),
};

const mockEnemyBoard = {
  receiveAttack: jest.fn(),
};

let myPlayer;

beforeEach(() => {
  myPlayer = player(mockMyBoard, mockEnemyBoard);
});

test('Player attack will call receiveAttack on the enemy board', () => {
  myPlayer.attack(1, 2);
  expect(mockEnemyBoard.receiveAttack).toHaveBeenCalledWith(1, 2);
});

test('Player attack will call receiveRandomAttack on the myBoard', () => {
  myPlayer.attack(2, 5);
  expect(mockMyBoard.receiveRandomAttack).toHaveBeenCalled();
});
