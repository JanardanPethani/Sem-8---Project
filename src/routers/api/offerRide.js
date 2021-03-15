const express = require('express')
const router = new express.Router()
const Offer = require('../../models/OffRide')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');

// @route   POST api/ride
// @desc    offer a ride
// @access  Private
router.post("/offer", [
    check('from', "Starting point is required").not().isEmpty(),
    check('to', "Destination is required").not().isEmpty(),
    check('departAt', "Date/Time is required").not().isEmpty()
], auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }
    const offer = new Offer({
        offBy: req.user._id,
        ...req.body
    })
    try {
        // console.log(req);
        const ride = await Offer.findByLoc(req.user._id, req.body.from, req.body.to)
        await offer.save();
        res.status(201).json(offer);
    } catch (error) {
        // console.log(error);
        res.status(400).json({ errors: [{ msg: error.message }] });
    }
})

// @route   GET api/ride
// @desc    Get all offers
// @access  Private
router.get('/allOffers', auth, async (req, res) => {
    try {
        const result = await Offer.find({ offBy: req.user._id }).populate('offBy', ['firstname', 'lastname', 'phone'])
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})

// @route   DELETE api/ride
// @desc    Delete a ride
// @access  Private
router.delete('/offer/:id', auth, async (req, res) => {
    try {
        const ride = await Offer.findOne({ _id: req.params.id, offBy: req.user.id })
        if (!ride) {
            throw new Error('Offer is not available')
        } else {
            await ride.remove()
            res.send(ride)
        }
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})

// @route   GET api/ride
// @desc    get offer data
// @access  Private
router.get('/offer/:id', auth, async (req, res) => {
    try {
        const ride = await Offer.findOne({ _id: req.params.id, offBy: req.user.id })
        if (!ride) {
            throw new Error('Offer is not available')
        } else {
            res.status(200).json(ride)
        }
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
})
module.exports = router
