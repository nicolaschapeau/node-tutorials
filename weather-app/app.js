const request = require('request')

const url = 'https://api.darksky.net/forecast/8a72df909a68b7059b23cdf44d4a8f01/48.9822,2.2578?units=si&lang=fr'

request({ url: url, json: true }, (error, response) => {
  console.log(response.body.daily.data[0].summary + ' Il fait actuellement ' + response.body.currently.temperature + ' degrés celsius dehors. Il y a ' + response.body.currently.precipProbability + '% de chances de pluie.')
})
