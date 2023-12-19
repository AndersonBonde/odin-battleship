import events from '../events';

function player() {
  let turn = 1;

  function attack(x, y) {
    turn += 1;

    events.emit('playerAttack', x, y, 'enemy');
  }

  return {
    get turn() { return turn; },
    attack,
  };
}

export default player;
