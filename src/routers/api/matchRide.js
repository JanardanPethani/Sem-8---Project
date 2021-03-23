const express = require('express')
const router = new express.Router()
const Request = require('../../models/ReqRide')
const Offer = require('../../models/OffRide')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

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

      const reqString = req.body.from
      const result = rides.filter((rideObj) => {
        const offString = rideObj.from
        const matchedWords = matchCount(reqString, offString)
        console.log(matchedWords)
        if (matchedWords.length >= 2) {
          return true
        } else {
          return false
        }
      })

      res.status(201).json(result)
    } catch (error) {
      res.status(400).json({ errors: [{ msg: error.message }] })
    }
  }
)

module.exports = router
