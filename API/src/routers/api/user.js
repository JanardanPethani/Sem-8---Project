const express = require('express')
const { check, validationResult } = require('express-validator/check');
const router = new express.Router()
const User = require('../../models/User')
const auth = require('../../middleware/auth');
const { validate } = require('../../models/User');

router.get('/logout', auth, async (req, res) => {
    try {

        res.clearCookie('jwt')
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.status(201).send(req.user);
    } catch (e) {
        res.status(500).send({ error: "Error" + e })
    }
})

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
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = new User({
            ...req.body
        })
        await user.save();
        const token = await user.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            // 10 sec = 10000 ms
            expires: new Date(Date.now() + (60 * 60 * 1000))
        })
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('jwt', token, {
            httpOnly: true,
            expires: new Date(Date.now() + (60 * 60 * 1000))
        })

        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e.message);
        // console.log(e);
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        res.clearCookie('jwt')
        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send({ error: "Error" + e })
    }
})

//* finding/reading users and tasks
//* middleware fun. added : auth
router.get('/me', auth, async (req, res) => {

    res.send(req.user)

})

//* updating endpoints use the PATCH HTTP method
router.patch('/user/me', auth, async (req, res) => {
    // req.body keys to array of keys
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])

        //by this middleware will be executed
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/user/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router