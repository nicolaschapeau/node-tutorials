const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiemtvbGFpdCIsImEiOiJjanRhbGV4MDgwYzA4NDNvM3pkaDhlbjh6In0.jrhokRgWVOm-N2Kkfxa2PA'

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Impossible to establish the connection !', undefined)
    } else if (!body.features || body.features.length === 0) {
      callback('Incorrect address !', undefined)
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        place_name: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
