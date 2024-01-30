function player(myBoardObj, enemyBoardObj) {
  const myBoard = myBoardObj;
  const enemyBoard = enemyBoardObj;

  /*
    To begin with, the computer will automatically attack back after getting hit;
  */
  function attack(column, row) {
    const myAttack = enemyBoard.receiveAttack(column, row);
    if (myAttack === 'Game Over') {
      // TODO: End game, player victory;
      console.log('Player victory!');
    }

    const enemyAttack = myBoard.receiveRandomAttack();
    if (enemyAttack === 'Game Over') {
      // TODO: End game, computer victory;
      console.log('Computer victory!');
    }
  }

  return {
    attack,
  };
}

module.exports = player;
