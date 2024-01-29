function ship(initialLength = 1) {
  const length = initialLength;
  let hits = 0;

  function hit() {
    hits += 1;

    return hits;
  }

  function isSunk() {
    return hits >= length;
  }

  return {
    hit,
    isSunk,
  };
}

module.exports = ship;
