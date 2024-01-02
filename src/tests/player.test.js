import player from '../factories/player';
import events from '../events';

jest.mock('../events');

let player1;

beforeEach(() => {
  player1 = player();
});

test('Initialize turn correctly', () => {
  expect(player1.turn).toBe(1);
});

test('Should increase turn after attack is called', () => {
  player1.attack(2, 3);
  expect(player1.turn).toBe(2);
});

test('Call the events.emit with the correct params', () => {
  player1.attack(1, 2);
  expect(events.emit).toHaveBeenCalledWith('playerAttack', 1, 2, 'enemy');
});
