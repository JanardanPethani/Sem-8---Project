const express = require('express')
const router = new express.Router()
const SendReq = require('../../models/SendReqToDriver')
const CompletedRide = require('../../models/CompletedRides')
const User = require('../../models/User')
const Offer = require('../../models/OffRide')
const auth = require('../../middleware/auth')

const { sendReqMail, sendStatusMail } = require('../../utils/sendmail')

// @route   POST api/sendReqMsg
// @desc    Sent request to rider
// @access  Private
router.post('/send', auth, async (req, res) => {
  const request = new SendReq({
    reqBy: req.user.id,
    to: req.body.to,
    forWhich: req.body.forWhich,
  })
  try {
    // console.log(req);
    const ride = await SendReq.findByUser({
      reqBy: req.user.id,
      to: req.body.to,
      forWhich: req.body.forWhich,
    })
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
    console.log(error)
    res.status(400).json({ errors: [{ msg: error.message }] })
  }
})

// @route   POST api/sendReqMsg
// @desc    Get all requests msgs by user
// @access  Private
router.get('/allReqMsgs', auth, async (req, res) => {
  try {
    const msgs = await SendReq.find({
      reqBy: req.user._id,
      status: ['Pending', 'Accepted'],
    })
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
// @desc    Get active ride for Driver
// @access  Private
router.get('/getActiveForDriver', auth, async (req, res) => {
  try {
    const ride = await SendReq.find({ to: req.user._id, status: 'Accepted' })
      .populate('reqBy')
      .populate('forWhich')
      .populate('to')

    res.status(201).json(ride)
  } catch (error) {
    res.status(400).json({ errors: [{ msg: error.message }] })
  }
})

// @route   POST api/sendReqMsg
// @desc    Get active ride for Passenger
// @access  Private
router.get('/getActiveForPassenger', auth, async (req, res) => {
  try {
    const ride = await SendReq.find({ reqBy: req.user._id, status: 'Accepted' })
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
    const msgs = await SendReq.find({ to: req.user._id, status: 'Pending' })
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

// @route   PATCH api/sendReqMsg
// @desc    Accept request
// @access  Private
router.patch('/acceptReq/:id', auth, async (req, res) => {
  try {
    const rides = await SendReq.find({
      to: req.user.id,
      status: 'Accepted',
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
      } else if (ride.status === 'Accepted') {
        throw new Error('Already accepted')
      } else {
        ride.status = 'Accepted'
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

// @route   PATCH api/sendReqMsg
// @desc    Payment confirmation
// @access  Private
router.patch('/paymentRec/:id', auth, async (req, res) => {
  try {
    const ride = await SendReq.findOne({
      _id: req.params.id,
      to: req.user.id,
    })
      .populate('reqBy')
      .populate('forWhich')
      .populate('to')
    const offId = ride.forWhich._id
    const copyRide = new CompletedRide({
      reqBy: `${ride.reqBy.firstname} ${ride.reqBy.lastname}`,
      reqByM: ride.reqBy.email,
      driver: `${ride.to.firstname} ${ride.to.lastname}`,
      driverM: ride.to.email,
      from: ride.forWhich.from,
      to: ride.forWhich.to,
      vehicleType: ride.forWhich.vehicletype,
      departedAt: ride.forWhich.departAt,
      price: ride.forWhich.price,
    })

    if (!ride) {
      throw new Error('Request Msg is not available')
    } else {
      ride.status = 'Payment Received'
      await ride.remove()
      await copyRide.save()
      await sendStatusMail(ride.reqBy.email, {
        request_to: `${req.user.firstname} ${req.user.lastname}`,
        phone: req.user.phone,
        from: ride.forWhich.from,
        Destination: ride.forWhich.to,
        type: ride.forWhich.vehicletype,
        status: 'Payment Completed',
      })

      res.status(201).send(ride)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: [{ msg: error.message }] })
  }
})

module.exports = router
