const express = require('express')
const router = new express.Router()
const SendReq = require('../../models/SendReqToDriver')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

const { sendReqMail } = require('../../utils/sendmail')

// @route   POST api/sendReqMsg
// @desc    Sent request to rider
// @access  Private
router.post('/send', auth, async (req, res) => {
  const dataObj = {
    reqBy: req.user._id,
    to: req.body.to,
    forWhich: req.body.forWhich,
  }
  const request = new SendReq(dataObj)
  try {
    // console.log(req);
    const ride = await SendReq.findByUser(dataObj)
    await request.save()
    await sendReqMail(req.body.email, {
      reqBy: `${req.user.firstname} ${req.user.lastname}`,
      phone: req.user.phone,
      from: req.body.from,
      Destination: req.body.destination,
      type: req.body.type,
    })
    res.status(201).json(request)
  } catch (error) {
    res.status(400).json({ errors: [{ msg: error.message }] })
  }
})

// @route   POST api/sendReqMsg
// @desc    Sent request to rider
// @access  Private
router.get('/allReqMsgs', auth, async (req, res) => {
  try {
    const msgs = await SendReq.find({ reqBy: req.user._id })
      .populate('to')
      .populate('forWhich')
    // console.log(msgs)
    res.status(201).json(msgs)
  } catch (error) {
    res.status(400).json({ errors: [{ msg: error.message }] })
  }
})

module.exports = router
