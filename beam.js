const randomState = require('./random-state')
const heuristic = require('./heuristic')

const { clone, flatten } = require('ramda')
const PriorityQueue = require('fastpriorityqueue')

function PQ () {
  return new PriorityQueue((a, b) => a.key < b.key)
}

function* generateNewStates (state, i, j) {
  const size = state.length
  for (let p = 0; p < size; p++) {
    for (let q = 0; q < size; q++) {
      const newState = clone(state)
      const newCell = state[p][q]
      if (newCell !== '.') {
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

function mergeK (k) {
  return function merge (queue, currentQueue) {
    for (let i = 0; i < k; i++) {
      queue.add(currentQueue.poll())
    }
    return queue
  }
}

function getFinal (pools) {
  const found = pools.filter(pool => pool.key === 0)
  return found.value || null
}

function repr (state) {
  return flatten(state).join('')
}

function pickFirst (k, queue) {
  console.log(queue)
  const array = []
  for (let i = 0; i < k; i++) {
    array.push(queue.poll())
  }
  return array
}

function beam (k) {
  let pools = Array(k).fill().map(() => ({
    key: 1000,
    value: randomState(8)
  }))
  const s = new Set()
  let steps = 0
  let final = null
  while (final === null) {
    steps += 1
    pools = pickFirst(k, pools.map(populate).reduce(mergeK(k), PQ()))

    // console.log(pools)

    final = getFinal(pools)

    // if (s.has(repr(pools[0].value))) {
    //   return {
    //     solved: false,
    //     steps: steps
    //   }
    // }
    // s.add(repr(pools[0].value))
    // pools.forEach(p => console.log(p))
    console.log(pools.map(p => p.key))
    console.log('---------------')
  }
  return {
    solved: true,
    value: getFinal(pools),
    steps: steps
  }
}

module.exports = beam

beam(20)
