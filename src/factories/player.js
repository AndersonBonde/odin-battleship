import gameboard from './gameboard';

function player() {
  let turn = 1;

  function attack(x, y) {
    turn += 1;

    gameboard.receiveAttack(x, y, 'enemy');

    // Enemy picks a random possible square;
    const randomSquare = gameboard.pickRandomSquare();
    gameboard.receiveAttack(randomSquare.x, randomSquare.y, 'player');
  }

  return {
    get turn() { return turn; },
    attack,
  };
}

export default player;
