const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/map', auth, (req, res) => {
    if (req.token) {
        res.render('locationSearch', {
            token: req.cookies.jwt
        })
    } else {
        res.render('login')
    }

    // if (!req.query.address) {
    //     return res.render("404", {
    //         title: '404',
    //         name: 'Janardan pethani',
    //         errorMsg: 'Address must be provided in URL'
    //     })
    // }
    if (req.query.address) {
        geoData(req.query.address, (error, { longitude, latitude, place } = {}) => {
            if (error) {
                return res.send({ error })
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
