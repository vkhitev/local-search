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
