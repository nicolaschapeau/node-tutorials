const request = require('request')

const url = 'https://api.darksky.net/forecast/8a72df909a68b7059b23cdf44d4a8f01/48.9822,2.2578?units=si&lang=fr'
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Ermont.json?access_token=pk.eyJ1IjoiemtvbGFpdCIsImEiOiJjanRhbGV4MDgwYzA4NDNvM3pkaDhlbjh6In0.jrhokRgWVOm-N2Kkfxa2PA'

request({ url: url, json: true }, (error, response) => {
  console.log(response.body.daily.data[0].summary + ' Il fait actuellement ' + response.body.currently.temperature + ' degrés celsius dehors. Il y a ' + response.body.currently.precipProbability + '% de chances de pluie.')
})

// Geocoding
request({ url: geocodeURL, json: true }, (error, response) => {
  const latitude = response.body.features[0].center[0]
  const longitude = response.body.features[0].center[1]
  console.log(latitude, longitude)
})
