const express = require('express')
const router = new express.Router()
const Request = require('../../models/ReqRide')
const auth = require('../../middleware/auth')

router.post("/request", auth, async (req, res) => {
    const request = new Request({
        reqBy: req.user._id,
        ...req.body
    })
    try {
        // console.log(req);
        const ride = await Request.findByLoc(req.user._id, req.body.from, req.body.to)
        await request.save();
        res.status(201).send(request);
    } catch (error) {
        console.log(error);
        res.status(400).json({ errors: [{ msg: error.message }] });
    }
})

router.get('/allRequests', auth, async (req, res) => {
    try {
        const result = await Request.find({ reqBy: req.user._id }).populate('reqBy', ['firstname', 'lastname', 'phone'])
        res.status(200).send(result)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const ride = await Request.findOne({ _id: req.params.id, reqBy: req.user.id })
        if (!ride) {
            throw new Error('Request is not available')
        } else {
            await ride.remove()
            res.send(ride)
        }
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})


module.exports = router
