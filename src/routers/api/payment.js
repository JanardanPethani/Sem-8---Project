const express = require('express')
const router = new express.Router()
const Razorpay = require('razorpay')
const shortid = require('shortid')

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// @route   GET api/pay
// @desc    Generate order Id
// @access  Private
router.post('/razorpay', async (req, res) => {
  try {
    var options = {
      amount: (+req.body.amount * 100).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise. 100p = 1rupee
      currency: 'INR',
      receipt: shortid.generate(),
      payment_capture: 1,
    }
    const response = await razorpay.orders.create(options)
    // console.log(response)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).json({ errors: [{ msg: error.message }] })
  }
})

module.exports = router
