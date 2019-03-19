const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/8a72df909a68b7059b23cdf44d4a8f01/' + latitude + ',' + longitude + '?units=si'

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Impossible to establish the connection !', undefined)
    } else if (body.error) {
      callback('Incorrect address !', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + ' It\'s actually ' + body.currently.temperature + ' degrees outside. There is ' + body.currently.precipProbability + '% chances of rain.')
    }
  })
}

module.exports = forecast
