import ship from '../factories/ship';

test('New ship should have been hit 0 times', () => {
  const myShip = ship();
  expect(myShip.hits).toBe(0);
});

test('Initial ship shouldn`t be sunk', () => {
  const myShip = ship();
  expect(myShip.isSunk()).toBe(false);
});

test('Hitting a ship 2 times', () => {
  const myShip = ship(3);
  myShip.hit();
  myShip.hit();
  expect(myShip.hits).toBe(2);
});

test('Ship with size 3 should be sunk after 3 hits', () => {
  const myShip = ship(3);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});
