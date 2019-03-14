const chalk = require('chalk')
const getNotes = require('./notes.js')

const msg = getNotes()
console.log(msg)

const greenSuccess = chalk.red('error')
console.log(greenSuccess)

const greenInversedBold = chalk.red.bold.inverse('error')
console.log(greenInversedBold)
