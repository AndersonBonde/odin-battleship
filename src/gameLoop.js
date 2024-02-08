const gameboard = require('./factories/gameboard');

(function gameLoop() {
  const playerBoard = gameboard('.playerBoard');
  const computerBoard = gameboard('.computerBoard');
  const shipContainer = document.querySelector('.shipContainer');
  const computerTurnDelay = 400;
  const playerShipsAmount = 8;
  let onGoing = false;
  let playerTurn = true;
  let winner;
  let shipBeingDragged;

  computerBoard.placeRandomShips(2, 5, 1);

  const playerTds = document.querySelectorAll('.playerBoard td[data-column]');
  const shipDraggables = document.querySelectorAll('.ship');
  const computerTds = document.querySelectorAll('.computerBoard td[data-column]');

  function canPlaceShipOnSquare(column, row, size) {
    let isPossible = true;

    for (let i = 0; i < size; i++) {
      const square = playerBoard.getSquare(+column + i, row);
      if (square != null) isPossible = false;
    }

    return isPossible;
  }

  function updateDraggedShip(targetTd) {
    const parent = targetTd.parentNode;
    const [column, row] = [targetTd.dataset.column, parent.dataset.row];
    shipBeingDragged.style.backgroundColor = 'rgba(180, 180, 180, 0.6)';
    shipBeingDragged.dataset.column = column;
    shipBeingDragged.dataset.row = row;
  }

  function addShipToBoard() {
    const { column, row, size } = shipBeingDragged.dataset;
    playerBoard.placeShip(column, row, size);
  }

  function removeDraggableFromShips() {
    shipDraggables.forEach((ship) => {
      ship.setAttribute('draggable', false);
    });
  }

  (function configureDraggables() {
    function allowDrop(ev) {
      ev.preventDefault();
    }

    function drag(ev) {
      shipBeingDragged = ev.target;
      const { column, row, size } = shipBeingDragged.dataset;

      if (column != -1) playerBoard.removeShip(column, row, size);

      ev.dataTransfer.setData('ship', ev.target.id);
    }

    function drop(ev) {
      const tdParent = ev.target.parentNode;
      const [column, row] = [ev.target.dataset.column, tdParent.dataset.row];
      const { size } = shipBeingDragged.dataset;
      if (!canPlaceShipOnSquare(column, row, size)) return;

      ev.preventDefault();
      const data = ev.dataTransfer.getData('ship');
      ev.target.appendChild(document.getElementById(data));

      updateDraggedShip(ev.target);
      addShipToBoard();
      shipBeingDragged = null;

      if (playerBoard.ships.length === playerShipsAmount) {
        onGoing = true;
        removeDraggableFromShips();
        shipContainer.style.display = 'none';
      }
    }

    playerTds.forEach((square) => {
      square.addEventListener('drop', drop);
      square.addEventListener('dragover', allowDrop);
    });

    shipDraggables.forEach((draggable) => {
      draggable.setAttribute('draggable', true);
      draggable.addEventListener('dragstart', drag);
    });
  }());

  function displayWinner() {
    console.log(`${winner} won the match!`);
  }

  computerTds.forEach((el) => {
    el.addEventListener('click', () => {
      if (!onGoing || !playerTurn) return;

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

        playerTurn = false;
        setTimeout(() => {
          playerTurn = true;

          const playerAttack = playerBoard.receiveRandomAttack();
          if (playerAttack == 'Game Over') {
            onGoing = false;
            winner = 'Computer';
            displayWinner();
          }
        }, computerTurnDelay);
      }
    });
  });
}());
