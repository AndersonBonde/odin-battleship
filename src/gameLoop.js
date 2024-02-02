const gameboard = require('./factories/gameboard');

const playerBoard = gameboard('.playerBoard');
const computerBoard = gameboard('.computerBoard');

playerBoard.placeRandomShips(10);
computerBoard.placeRandomShips(10);

function displayShips() {
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
}
displayShips();

const playerTds = document.querySelectorAll('.playerBoard td[data-column]');
const computerTds = document.querySelectorAll('.computerBoard td[data-column]');

function paintShotSquare(column, row, color, target) {
  const tr = document.querySelector(`${target} tr[data-row='${row}']`);
  const td = tr.querySelector(`td[data-column='${column}']`);

  td.style.backgroundColor = color;
}

computerTds.forEach((el) => {
  el.addEventListener('click', () => {
    const parent = el.parentNode;
    const { column } = el.dataset;
    const { row } = parent.dataset;

    const attack = computerBoard.receiveAttack(column, row);

    if (!attack) {
      console.log('Can"t attack the same square twice.');
    } else {
      playerBoard.receiveRandomAttack();
    }
  });
});
