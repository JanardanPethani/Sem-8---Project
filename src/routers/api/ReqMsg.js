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
// @desc    Get all requests msgs by user
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

// @route   POST api/sendReqMsg
// @desc    Get all requests msgs to user
// @access  Private
router.get('/allReqMsgsToMe', auth, async (req, res) => {
  try {
    const msgs = await SendReq.find({ to: req.user._id })
      .populate('reqBy')
      .populate('forWhich')
    // console.log(msgs)
    res.status(201).json(msgs)
  } catch (error) {
    res.status(400).json({ errors: [{ msg: error.message }] })
  }
})

// @route   DELETE api/sendReqMsg
// @desc    delete a request msg
// @access  Private
router.delete('/msg/:id', auth, async (req, res) => {
  try {
    const ride = await SendReq.findOne({
      _id: req.params.id,
      reqBy: req.user.id,
    })
    if (!ride) {
      throw new Error('Request Msg is not available')
    } else {
      await ride.remove()
      res.send(ride)
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] })
  }
})

// @route   DELETE api/sendReqMsg
// @desc    delete a request msg
// @access  Private
router.delete('/receMsg/:id', auth, async (req, res) => {
  try {
    const ride = await SendReq.findOne({
      _id: req.params.id,
      to: req.user.id,
    })
    if (!ride) {
      throw new Error('Request Msg is not available')
    } else {
      await ride.remove()
      res.send(ride)
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] })
  }
})
module.exports = router
