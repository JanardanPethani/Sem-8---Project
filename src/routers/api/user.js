const express = require('express')
const { check, validationResult } = require('express-validator/check');
const router = new express.Router()
const User = require('../../models/User')
const auth = require('../../middleware/auth');

// @route   POST api/user
// @desc    Register a user
// @access  Public
router.post("/register", [
    check('firstname', "First name is required").not().isEmpty(),
    check('lastname', "Last name is required").not().isEmpty(),
    check('email', "Include valid email").isEmail(),
    check('password', "Please enter password with six or more characters").isLength({
        min: 6
    }),
    check('phone', "Please enter phone number of length 10").isLength({
        min: 10,
        max: 10
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = new User({
            ...req.body
        })
        await user.save();
        const token = await user.generateAuthToken();
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     // 1 sec = 1000 ms
        //     expires: new Date(Date.now() + (60 * 60 * 1000))
        // })
        // console.log(user);
        res.status(201).json({ token });
    } catch (error) {
        // console.log(error);
        res.status(400).json({ errors: [{ msg: error.message }] });
    }
})

// @route   PATCH api/user
// @desc    Update a user
// @access  Private
router.patch('/me', auth, async (req, res) => {
    // req.body keys to array of keys
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname', 'lastname', 'phone', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        //* Do not create new object
        await req.user.save()
        res.send(req.user)

    } catch (error) {
        res.status(400).send({ errors: [{ msg: error.message }] })
    }
})

// @route   DELETE api/user
// @desc    Delete a user
// @access  Private
router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})

module.exports = router