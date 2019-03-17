const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Nicolas Chapeau'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Nicolas Chapeau'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    help_message: 'This is a help message.'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'It is sunny outside',
    location: 'Ermont, France'
  })
})


app.listen(4000, () => {
  console.log('Server running ! ( port : 4000 )')
})
