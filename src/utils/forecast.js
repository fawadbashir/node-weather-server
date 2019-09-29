const request = require('request')


const foreCast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/48f59c5fab71be9338afb59c4811b4f5/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('cannot reach the newtork', undefined)
        } else if (!response.body.currently) {
            callback('unable to find forecast. Try another search', undefined)
        } else {
            callback(undefined, ` ${response.body.hourly.summary} Currently ${response.body.currently.temperature} degrees out. There is  ${response.body.currently.precipProbability}%  chance of Rain. ${response.body.daily.summary}`)
        }
    })
}

module.exports = foreCast