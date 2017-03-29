const reports = [{
  steps: 100,
  solvability: true,
  time: 1232
}, {
  steps: 300,
  solvability: true,
  time: 1323
}, {
  steps: 123124,
  solvability: false,
  time: 10000
}]

const fs = require('fs')
const config = require('./config')

function buildSummary (reports) {
  return `
+ Автор: ${config.author}
+ Вариант: ${config.variant}
+ Задача: ${config.task}
+ Алгоритм: ${config.algorithm.name}
`
}

// console.log(buildSummary(reports))

// fs.writeFileSync('./summary.md', buildSummary(reports))

const beam = require('./beam')

for (let k = config.algorithm.mink; k <= config.algorithm.maxk; k++) {
  const summary = {
    beams: k,
    result: []
  }
  for (let i = 0; i < 20; i++) {
    const start = new Date()
    const solution = beam(k)
    const duration = (new Date() - start) / 1000
    summary.result.push(Object.assign({}, solution, { duration }))
  }
  fs.writeFileSync(`./reports/report-${k}.json`, JSON.stringify(summary, null, 2))
}
