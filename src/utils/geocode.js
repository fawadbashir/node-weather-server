const request = require('request')


const geoCode = (address,callback) => {

    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiZmF3YWQxIiwiYSI6ImNrMGFvbmd5bzBsdHYzbXF0YXQwOHN3YWcifQ.94lEoriFT_imQQ7lvLCU5Q`

    request({url,json : true},(error, response)=>{
        if(error) {
            callback('connot reah the network',undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location. Try another search',undefined)
        } else {
            callback(undefined,{
                location : response.body.features[0].place_name,
              longitude: response.body.features[0].center[0],
              latitude: response.body.features[0].center[1]
            })
        }
    })

}

module.exports = geoCode