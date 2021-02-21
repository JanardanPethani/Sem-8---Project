const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/test', (req, res) => {
    res.send('From a new file')
})

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})
/* router.post("/user/signup", async (req, res) => {
    const user = new User(req.body)
    console.log(user);

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then((result) => {
    //     res.status(201).send(result)
    // }).catch((err) => {
    //     res.status(400).send(err)
    // })
}) */

router.post("/register", async (req, res) => {
    try {
        const user = new User({
            firstname: req.body.fn,
            lastname: req.body.ln,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        })
        const registered = await user.save();
        const token = await user.generateAuthToken();
        res.status(201).render('index');
        //res.status(201).render('index');
    } catch(error) {
         res.status(400).send(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //res.send({ user, token })
        console.log(req.body.email);
        res.render('index')
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send({ error: "Error" + e })
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send({ error: "Error" + e })
    }
})

//* finding/reading users and tasks
//* middleware fun. added : auth
router.get('/user/me', auth, async (req, res) => {

    res.send(req.user)

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }

    // User.find({}).then((result) => {
    //     res.send(result)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
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