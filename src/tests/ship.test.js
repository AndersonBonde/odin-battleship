import ship from '../factories/ship';

let myShip;

beforeEach(() => {
  myShip = ship(3);
})

test('New ship should have been hit 0 times', () => {
  expect(myShip.hits).toBe(0);
});

test('Initial ship shouldn`t be sunk', () => {
  expect(myShip.isSunk()).toBe(false);
});

test('Hitting a ship 2 times', () => {
  myShip.hit();
  myShip.hit();
  expect(myShip.hits).toBe(2);
});

test('Ship with size 3 should be sunk after 3 hits', () => {
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});
