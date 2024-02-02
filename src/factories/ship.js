function ship(initialPos, initialLength = 1) {
  const length = initialLength;
  const pos = initialPos;
  let hits = 0;

  function hit() {
    hits += 1;

    return hits;
  }

  function isSunk() {
    return hits >= length;
  }

  return {
    get pos() { return pos; },
    hit,
    isSunk,
  };
}

module.exports = ship;
