const express = require('express')
const router = new express.Router()
const SendReq = require('../../models/SendReqToDriver')
const User = require('../../models/User')
const auth = require('../../middleware/auth')

const { sendReqMail, sendStatusMail } = require('../../utils/sendmail')

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
      .populate('reqBy')
    // console.log(msgs)
    res.status(201).json(msgs)
  } catch (error) {
    res.status(400).json({ errors: [{ msg: error.message }] })
  }
})

// @route   POST api/sendReqMsg
// @desc    Get active ride
// @access  Private
router.get('/getActive', auth, async (req, res) => {
  try {
    const ride = await SendReq.find({ to: req.user._id, status: 'accepted' })
      .populate('reqBy')
      .populate('forWhich')
      .populate('to')

    res.status(201).json(ride)
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
      res.status(201).send(ride)
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
      .populate('reqBy')
      .populate('forWhich')
    if (!ride) {
      throw new Error('Request Msg is not available')
    } else {
      await sendStatusMail(ride.reqBy.email, {
        request_to: `${req.user.firstname} ${req.user.lastname}`,
        phone: req.user.phone,
        from: ride.forWhich.from,
        Destination: ride.forWhich.to,
        type: ride.forWhich.vehicletype,
        status: 'Declined',
      })
      await ride.remove()
      res.status(201).send(ride)
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] })
  }
})

// @route   DELETE api/sendReqMsg
// @desc    Accept request
// @access  Private
router.patch('/acceptReq/:id', auth, async (req, res) => {
  try {
    const rides = await SendReq.find({
      to: req.user.id,
      status: 'accepted',
    })
    if (rides.length > 0) {
      throw new Error('Other ride is in process')
    } else {
      const ride = await SendReq.findOne({
        _id: req.params.id,
        to: req.user.id,
      })
        .populate('reqBy')
        .populate('forWhich')

      if (!ride) {
        throw new Error('Request Msg is not available')
      } else if (ride.status === 'accepted') {
        throw new Error('Already accepted')
      } else {
        ride.status = 'accepted'
        await ride.save()
        await sendStatusMail(ride.reqBy.email, {
          request_to: `${req.user.firstname} ${req.user.lastname}`,
          phone: req.user.phone,
          from: ride.forWhich.from,
          Destination: ride.forWhich.to,
          type: ride.forWhich.vehicletype,
          status: 'Accepted',
        })

        res.status(201).send(ride)
      }
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message }] })
  }
})

module.exports = router
