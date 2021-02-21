const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/map', (req, res) => {
    res.render('locationSearch')
})

module.exports = router
