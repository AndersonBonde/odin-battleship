const gameboard = require('./factories/gameboard');

function gameLoop() {
  const playerBoard = gameboard('.playerBoard');
  const computerBoard = gameboard('.computerBoard');
  let onGoing = true;
  let winner;

  // playerBoard.placeRandomShips(10);
  computerBoard.placeRandomShips(10);

  (function displayShips() {
    playerBoard.ships.forEach((ship) => {
      const tr = document.querySelector(`.playerBoard tr[data-row='${ship.pos.row}']`);
      const td = tr.querySelector(`td[data-column='${ship.pos.column}']`);

      td.style.backgroundColor = 'lightgrey';
    });

    computerBoard.ships.forEach((ship) => {
      const tr = document.querySelector(`.computerBoard tr[data-row='${ship.pos.row}']`);
      const td = tr.querySelector(`td[data-column='${ship.pos.column}']`);

      td.style.backgroundColor = 'lightgrey';
    });
  }());

  const playerTds = document.querySelectorAll('.playerBoard td[data-column]');
  const computerTds = document.querySelectorAll('.computerBoard td[data-column]');

  function displayWinner() {
    console.log(`${winner} won the match!`);
  }

  computerTds.forEach((el) => {
    el.addEventListener('click', () => {
      if (!onGoing) return;

      const parent = el.parentNode;
      const { column } = el.dataset;
      const { row } = parent.dataset;

      const computerAttack = computerBoard.receiveAttack(column, row);

      if (!computerAttack) {
        console.log('Can"t attack the same square twice.');
      } else {
        if (computerAttack == 'Game Over') {
          onGoing = false;
          winner = 'Player';
          displayWinner();
        }

        const playerAttack = playerBoard.receiveRandomAttack();
        if (playerAttack == 'Game Over') {
          onGoing = false;
          winner = 'Computer';
          displayWinner();
        }
      }
    });
  });
}
gameLoop();