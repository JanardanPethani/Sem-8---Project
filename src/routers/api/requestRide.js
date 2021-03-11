const express = require('express')
const router = new express.Router()
const Request = require('../../models/ReqRide')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');

// @route   POST api/ride
// @desc    Request a ride
// @access  Private
router.post("/request", [
    check('from', "Pick up point is required").not().isEmpty(),
    check('to', "Destination is required").not().isEmpty(),
    check('departAt', "Date/Time is required").not().isEmpty()
],
    auth, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        const request = new Request({
            reqBy: req.user._id,
            ...req.body
        })
        try {
            // console.log(req);
            const ride = await Request.findByLoc(req.user._id, req.body.from, req.body.to)
            await request.save();
            res.status(201).json(request);
        } catch (error) {
            console.log(error);
            res.status(400).json({ errors: [{ msg: error.message }] });
        }
    })

// @route   GET api/ride
// @desc    Get all requests
// @access  Private
router.get('/allRequests', auth, async (req, res) => {
    try {
        const result = await Request.find({ reqBy: req.user._id })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})

// @route   DELETE api/ride
// @desc    delete a request
// @access  Private
router.delete('/request/:id', auth, async (req, res) => {
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
