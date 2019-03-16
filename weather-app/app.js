const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]

if (!location) {
  return console.log('Il faut choisir un endroit.')
} else {
  geocode(location, (error, {latitude, longitude, place_name}) => {
    if (error) {
      return console.log(error)
    }

    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return console.log(error)
      }

      console.log(place_name)
      console.log(forecast)
    })
  })
}
