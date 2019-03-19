const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

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
    help_message: 'This is a help message.',
    name: 'Nicolas Chapeau'
  })
})


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address !'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error })
      }

      console.log(place_name)
      console.log(forecast)

      return res.send({
        forecast: forecast,
        location: place_name,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You mush provide a search term'
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 - Help',
    message: 'Help article not found',
    name: 'Nicolas Chapeau'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found',
    name: 'Nicolas Chapeau'
  })
})

app.listen(4000, () => {
  console.log('Server running ! ( port : 4000 )')
})
