const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const getLngLat = require('../../utils/geocode')

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

module.exports = router
