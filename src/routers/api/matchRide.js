const express = require('express')
const router = new express.Router()
const Request = require('../../models/ReqRide')
const Offer = require('../../models/OffRide')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const { getLngLat } = require('../../utils/geocode')
const { matchCount } = require('../../utils/match')

// @route   POST api/match
// @desc    Match to offers
// @access  Private
router.post(
  '/request',
  [check('from', 'Pick up point is required').not().isEmpty()],
  auth,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // console.log(errors);
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const rides = await Offer.find({
        offBy: { $ne: req.user.id },
      }).populate('offBy', ['firstname', 'lastname', 'phone', 'email'])
      getLngLat(req.body.from, async (error, response) => {
        console.log(response)
        res.status(201).json(rides)
      })
    } catch (error) {
      res.status(400).json({ errors: [{ msg: error.message }] })
    }
  }
)

module.exports = router
