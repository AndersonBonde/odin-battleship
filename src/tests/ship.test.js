const ship = require('../factories/ship');

let myShip;

beforeEach(() => {
  myShip = ship();
});

test('Ship can be hit', () => {
  expect(myShip.hit()).toBe(1);
  expect(myShip.hit()).toBe(2);
});

test('Ship of size 1 will be sunk after 1 hit', () => {
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});

test('New ships isSunk() returns false', () => {
  expect(myShip.isSunk()).toBe(false);
});
