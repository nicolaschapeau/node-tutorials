const validator = require('validator')
const getNotes = require('./notes.js')

const msg = getNotes()
const email = validator.isEmail('email@gmail.com')
const url = validator.isURL('http://welcome.com')

console.log(msg)
console.log(email)
console.log(url)
