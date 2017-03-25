function generateTwoDim (rows, cols, filler) {
  return Array(rows).fill().map(() => Array(cols).fill(filler))
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function* randomUniqueIntGenerator (min, max) {
  const s = new Set()
  while (s.size !== max - min + 1) {
    let value = getRandomInt(min, max)
    while (s.has(value)) {
      value = getRandomInt(min, max)
    }
    s.add(value)
    yield value
  }
}

function idxToCoords (idx, size) {
  return {
    row: Math.floor(idx / size),
    col: idx % size
  }
}

function randomState (size, queens = 5, khights = 5) {
  if (size * size < queens + khights) {
    throw new Error('Too much figures or too small board')
  }
  const board = generateTwoDim(size, size, '.')
  const generator = randomUniqueIntGenerator(0, size * size - 1)
  for (let i = 0; i < queens; i++) {
    const queenIdx = generator.next().value
    const { row, col } = idxToCoords(queenIdx, size)
    board[row][col] = 'q'
  }
  for (let i = 0; i < khights; i++) {
    const knightIdx = generator.next().value
    const { row, col } = idxToCoords(knightIdx, size)
    board[row][col] = 'n'
  }
  return board
}

module.exports = randomState
