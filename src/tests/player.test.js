import player from '../factories/player';
import events from '../events';

// Mock the events module;
jest.mock('../events');

test('Initialize turn correctly', () => {
  const player1 = player();
  expect(player1.turn).toBe(1);
});

test('Should increase turn after attack is called', () => {
  const player1 = player();
  player1.attack(2, 3);
  expect(player1.turn).toBe(2);
});

test('Call the events.emit with the correct params', () => {
  const player1 = player();
  player1.attack(1, 2);
  expect(events.emit).toHaveBeenCalledWith('playerAttack', 1, 2, 'enemy');
});
