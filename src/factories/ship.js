function ship(initialValue = 1) {
  const size = initialValue;
  let hits = 0;

  function hit() {
    hits += 1;
    return hits;
  }

  function isSunk() {
    return (hits >= size);
  }

  return {
    get hits() { return hits; },
    hit,
    isSunk,
  };
}

export default ship;
