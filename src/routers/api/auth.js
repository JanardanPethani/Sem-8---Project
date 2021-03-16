const express = require('express')
const { check, validationResult } = require('express-validator');
const router = new express.Router()
const User = require('../../models/User')
const auth = require('../../middleware/auth');
const { sendemail } = require('../../utils/sendmail')

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(500).send({ errors: [{ msg: error.message }] })
    }
})

// @route   POST api/auth
// @desc    Log in user
// @access  Public
router.post('/login', [
    check('email', "Include valid email").isEmail(),
    check('password', "Please enter password")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] });
    }
})

// @route   POST api/getUser
// @desc    find user by email
// @access  Public
let mainOtp = ''
router.post('/getUser', async (req, res) => {
    // console.log('From checkUser');
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("User not found")
        }

        const otp = await sendemail(req.body.email)
        mainOtp = otp

        res.status(200).json({ msg: `Otp has been sent to ${user.email}` });
    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] })
    }
})

// @route   POST api/checkOtp
// @desc    validate otp
// @access  Public
router.post('/checkOtp', async (req, res) => {
    console.log(req);
    if (mainOtp == req.body.otp) {
        console.log(mainOtp);
        return res.status(200).json({ msg: "Valid Otp" })
    }
    // console.log(mainOtp);

    return res.status(400).json({
        errors: [{
            msg: 'Invalid Otp'
        }]
    })
})

// @route   POST api/auth
// @desc    Log out user
// @access  Private
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})

// @route   POST api/auth
// @desc    Log Out from all devices
// @access  Private
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send(req.user)

    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] })
    }
})



module.exports = router