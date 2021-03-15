const request = require('request')

const getLngLat = (city, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + ".json" + "?access_token=" + process.env.MAP_ACCESS_TOKEN + "&limit=1"

    //mapbox request
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect mapbox weather API. \nmsg:' + error.message, undefined)
        } else if (body.message) {
            callback('Mapbox weather API. msg:' + body.message, undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}

const getPlaceName = ({ latitude, longitude }, callback) => {
    console.log(latitude + ',' + longitude);
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + longitude + ',' + latitude + ".json?access_token=" + process.env.MAP_ACCESS_TOKEN

    //mapbox request
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect mapbox weather API. \nmsg:' + error.message, undefined)
        } else if (body.message) {
            callback('Mapbox API. \nmsg:' + body.message, undefined)
        } else {
            console.log(body);
            callback(undefined, {
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = { getLngLat, getPlaceName }