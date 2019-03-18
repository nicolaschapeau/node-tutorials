const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/8a72df909a68b7059b23cdf44d4a8f01/' + latitude + ',' + longitude + '?units=si&lang=fr'

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Impossible to establish the connection !', undefined)
    } else if (body.error) {
      callback('Incorrect address !', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + ' Il fait actuellement ' + body.currently.temperature + ' degrés celsius dehors. Il y a ' + body.currently.precipProbability + '% de chances de pluie.')
    }
  })
}

module.exports = forecast
