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

// @route   GET api/pay
// @desc    verify
// @access  Private
router.post('/verification', (req, res) => {
  const secret = 'getyourride'
  console.log(req.body)
  const crypto = require('crypto')

  const shasum = crypto.createHmac('sha256', secret)
  shasum.update(JSON.stringify(req.body))
  const digest = shasum.digest('hex')
  console.log(digest, req.headers['x-razorpay-signature'])

  // comes from razorpay webhook
  if (digest === req.headers['x-razorpay-signature']) {
    console.log('request is legit')
    // process it
    require('fs').writeFileSync(
      'payment1.json',
      JSON.stringify(req.body, null, 4)
    )
  } else {
    // pass it
  }
  res.json({ status: 'ok' })
})
module.exports = router
