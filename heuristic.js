function queenHeuristic (state, i, j) {
  function getCellValue (q, p) {
    const val = state[q][p]
    return (val === 'q') ? 1 : (val === 'n') ? 2 : 0
  }
  let size = state.length
  let value = 0
  let curVal = 0
  // North
  for (let m = i - 1, n = j; m >= 0; m--) {
    curVal = getCellValue(m, n)
    if (curVal > 0) {
      value += curVal
      break
    }
  }
  // North-East
  for (let m = i - 1, n = j + 1; m >= 0 && n < size; m--, n++) {
    curVal = getCellValue(m, n)
    if (curVal > 0) {
      value += curVal
      break
    }
  }
  // East
  for (let m = i, n = j + 1; n < size; n++) {
    curVal = getCellValue(m, n)
    if (curVal > 0) {
      value += curVal
      break
    }
  }
  // South-East
  for (let m = i + 1, n = j + 1; n < size && m < size; n++, m++) {
    curVal = getCellValue(m, n)
    if (curVal > 0) {
      value += curVal
      break
    }
  }
  // South
  for (let m = i + 1, n = j; m < size; m++) {
    curVal = getCellValue(m, n)
    if (curVal > 0) {
      value += curVal
      break
    }
  }
  // South-West
  for (let m = i + 1, n = j - 1; n >= 0 && m < size; n--, m++) {
    curVal = getCellValue(m, n)
    if (curVal > 0) {
      value += curVal
      break
    }
  }
  // West
  for (let m = i, n = j - 1; n >= 0; n--) {
    curVal = getCellValue(m, n)
    if (curVal > 0) {
      value += curVal
      break
    }
  }
  // North-West
  for (let m = i - 1, n = j - 1; n >= 0 && m >= 0; n--, m--) {
    curVal = getCellValue(m, n)
    if (curVal > 0) {
      value += curVal
      break
    }
  }
  return value
}

function khightHeuristic (state, i, j) {
  function getCellValue (q, p) {
    const val = state[q][p]
    return (val === 'n') ? 1 : (val === 'q') ? 2 : 0
  }
  const size = state.length
  return [
    { m: i - 2, n: j + 1 },
    { m: i - 1, n: j + 2 },
    { m: i + 1, n: j + 2 },
    { m: i + 2, n: j + 1 },
    { m: i + 2, n: j - 1 },
    { m: i + 1, n: j - 2 },
    { m: i - 1, n: j - 2 },
    { m: i - 2, n: j - 1 }
  ].filter(({ m, n }) => m >= 0 && n >= 0 && m < size && n < size)
    .reduce((sum, { m, n }) => sum + getCellValue(m, n), 0)
}

function heuristic (state) {
  let value = 0
  const size = state.length
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (state[i][j] === 'q') {
        value += queenHeuristic(state, i, j)
      } else if (state[i][j] === 'n') {
        value += khightHeuristic(state, i, j)
      }
    }
  }
  return value / 2
}

module.exports = heuristic
