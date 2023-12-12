import gameboard from '../factories/gameboard';

test('Create a board', () => {
  const myBoard = gameboard(10, 10);
  expect(myBoard).toHaveProperty('board');
});
