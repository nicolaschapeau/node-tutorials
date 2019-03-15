const fs = require('fs')
const chalk = require('chalk')

const error__duplicate__note = chalk.red.inverse('Note title already taken !')
const success__added__note = chalk.green.inverse('New note added !')
const success__removed__note = chalk.green.inverse('Note removed !')
const error__nomatch__note = chalk.red.inverse('Note doesn\'t exist !')
const error__no__note = chalk.red.inverse('No any notes !')

const notes__list__title = chalk.blue('Your notes :')

const getNotes = () => {
  return 'Your notes...'
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })

    saveNotes(notes)
    console.log(success__added__note)
  } else {
    console.log(error__duplicate__note)
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length !== notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(success__removed__note)
  } else {
    console.log(error__nomatch__note)
  }
}


const listNotes = () => {
  const notes = loadNotes()

  debugger

  if (notes.length > 0) {
    console.log(notes__list__title)
    notes.forEach((note) => {
      console.log(chalk.green(note.title))
    })
  } else {
    console.log(error__no__note)
  }
}


const readNote = (title) => {
  const notes = loadNotes()

  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log('')
    console.log(chalk.blue.inverse('Title :'))
    console.log(chalk.blue(note.title))
    console.log('')
    console.log(chalk.blue.inverse('Body :'))
    console.log(chalk.blue(note.body))
    console.log('')
  } else {
    console.log(error__nomatch__note)
  }
}


const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote
}
