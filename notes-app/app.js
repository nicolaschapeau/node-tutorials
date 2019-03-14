const validator = require('validator')
const getNotes = require('./notes.js')

const msg = getNotes()
const url = validator.isURL('http://welcome.com')

console.log(url)
