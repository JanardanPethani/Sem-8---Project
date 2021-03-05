const request = require('request')

const getLatLong = (city, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + ".json" + "?access_token=pk.eyJ1IjoiamFuYXJkYW4xNyIsImEiOiJja2x0OXkycW8wYXhkMm9uOHZrajFsZ3M0In0.5eBpRfGUyCxjRV9JY9s97w&limit=1"

    //mapbox request
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect mapbox weather API. \nmsg:' + error.message, undefined)
        } else if (body.message) {
            callback('Mapbox weather API. \nmsg:' + body.message, undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = getLatLong