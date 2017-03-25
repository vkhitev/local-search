const randomState = require('./random-state')
const heuristic = require('./heuristic')

const { clone } = require('ramda')
const PriorityQueue = require('fastpriorityqueue')

function PQ () {
  return new PriorityQueue((a, b) => a.key < b.key)
}

function* generateNewStates (state, i, j) {
  const size = state.length
  const cell = state[i][j]
  for (let p = 0; p < size; p++) {
    for (let q = 0; q < size; q++) {
      const newState = clone(state)
      const newCell = state[p][q]
      if (newCell === cell) {
        continue
      }
      [newState[p][q], newState[i][j]] = [newState[i][j], newState[p][q]]
      yield newState
    }
  }
}

function populate (node) {
  const state = node.value
  const queue = PQ()
  const size = state.length
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (state[i][j] !== '.') {
        for (let newState of generateNewStates(state, i, j)) {
          queue.add({
            key: heuristic(newState),
            value: newState
          })
        }
      }
    }
  }
  return queue
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getBestK (k) {
  return function (queue) {
    const best = []
    for (let i = 0; i < k; i++) {
      best.push(queue.poll())
      // Псевдорандом не катит
      // best.push(queue.array[getRandomInt(0, queue.array.length - 1)])
    }
    return best
  }
}

function mergeBestK (k) {
  return function (queue, cur) {
    cur.forEach(node => {
      queue.add(node)
    })
    return queue
  }
}

function hasFinal (pools) {
  return pools[0].key === 0
}

function beam (k) {
  let pools = Array(k).fill().map(() => ({
    key: 1000,
    value: randomState(8)
  }))
  let stuck = {
    key: 0,
    times: 0
  }
  while (!hasFinal(pools)) {
    pools = pools
      .map(populate)
      .map(getBestK(k))
      .reduce(mergeBestK(k), PQ())
      .array.slice(0, k)
    if ([1, 2].includes(pools[0].key)) {
      stuck.times += 1
    } else {
      stuck.key = pools[0].key
      stuck.times = 1
    }
    if (stuck.times === 15) {
      return 'Stuck in local pit'
    }
    console.log(pools[0])
  }
  return pools[0].value
}

console.log(beam(50))
