const express = require('express')
const { check, validationResult } = require('express-validator/check');
const router = new express.Router()
const User = require('../../models/User')
const auth = require('../../middleware/auth');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        // console.log(req.user);
        res.send(req.user)
    } catch (error) {
        // console.log(error);
        res.status(500).send({ errors: [{ msg: error.message }] })
    }
})

router.post('/login', [
    check('email', "Include valid email").isEmail(),
    check('password', "Please enter password")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('jwt', token, {
            httpOnly: true,
            expires: new Date(Date.now() + (60 * 60 * 1000))
        })

        res.status(201).send(user);
    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] });
        // console.log(e);
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        res.clearCookie('jwt')
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        res.clearCookie('jwt')
        await req.user.save()

        res.send('Logged out from all devices')

    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] })
    }
})

module.exports = router