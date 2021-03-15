const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const { getLngLat, getPlaceName } = require('../../utils/geocode')

// @route   GET api/map
// @desc    Get lng lat
// @access  Public
router.get('/fgeocode', (req, res) => {

    if (!req.query.address) {
        return res.json({
            errors: [{ msg: 'Address must be provided in URL' }]
        })
    }
    if (req.query.address) {
        // console.log('From map api');
        getLngLat(req.query.address, (error, { longitude, latitude, place } = {}) => {
            if (error) {
                return res.json({ errors: [{ msg: error }] })
            }
            res.json({
                place: place,
                lat: latitude,
                long: longitude,
            })
        })
    }
})

router.get('/getPlace', (req, res) => {

    if (!req.body.LatLong) {
        return res.json({
            errors: [{ msg: 'LatLong must be provided' }]
        })
    }
    if (req.body.LatLong) {
        console.log(req.body.LatLong);
        getPlaceName(req.body.LatLong, (error, { placeName } = {}) => {
            if (error) {
                return res.json({ errors: [{ msg: error }] })
            }
            res.json({
                place: placeName
            })
        })
    }
})


module.exports = router
