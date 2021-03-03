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
})

module.exports = router
