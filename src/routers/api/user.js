const express = require('express')
const { check, validationResult } = require('express-validator')
const router = new express.Router()
const User = require('../../models/User')
const CompletedRides = require('../../models/CompletedRides')
const auth = require('../../middleware/auth')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const DIR = './public/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, uuidv4() + '-' + fileName)
  },
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

// limit 5mb
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
})

// @route   POST api/user
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('firstname', 'First name is required').not().isEmpty(),
    check('lastname', 'Last name is required').not().isEmpty(),
    check('email', 'Include valid email').isEmail(),
    check('age', 'Age is required').not().isEmpty(),
    check(
      'password',
      'Please enter password with six or more characters'
    ).isLength({
      min: 6,
    }),
    check('phone', 'Please enter phone number of length 10').isLength({
      min: 10,
      max: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // console.log(errors);
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const user = new User({
        ...req.body,
      })
      await user.save()
      const token = await user.generateAuthToken()

      // console.log(user);
      res.status(201).json({ token })
    } catch (error) {
      if (error.code == 11000) {
        res.status(400).json({ errors: [{ msg: 'User available' }] })
      } else {
        console.log(error.code)
        res.status(400).json({ errors: [{ msg: error.message }] })
      }
    }
  }
)

// @route   PATCH api/user
// @desc    Update a user
// @access  Private
router.patch('/me', auth, async (req, res) => {
  // req.body keys to array of keys
  const updates = Object.keys(req.body)
  const allowedUpdates = ['firstname', 'lastname', 'phone', 'age', 'email']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).json({ errors: [{ msg: 'Invalid Updates' }] })
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]))
    //* Do not create new object
    await req.user.save()
    res.status(201).send(req.user)
  } catch (error) {
    if (error.code == 11000) {
      res.status(400).json({ errors: [{ msg: 'User available' }] })
    } else {
      console.log(error.code)
      res.status(400).json({ errors: [{ msg: error.message }] })
    }
  }
})

// @route   GET api/user
// @desc    Upload photo
// @access  Private
router.post('/photo', upload.single('profileImage'), auth, async (req, res) => {
  try {
    // console.log(req.protocol)
    // console.log(req.get('host'))
    req.user.profileImage = req.file.path
      ? req.file.path
      : req.user.profileImage
    await req.user.save()

    // console.log(user);
    res.status(201).send('Done')
  } catch (error) {
    // console.log(error)
    res.status(400).json({ errors: [{ msg: error.message }] })
  }
})

// @route   GET api/user
// @desc    History
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const rides_p = await CompletedRides.find({ reqByM: req.user.email })

    const rides_d = await CompletedRides.find({ driverM: req.user.email })

    // console.log(rides_p, rides_d)
    res.status(201).send([...rides_d, ...rides_p])
  } catch (error) {
    res.status(400).send({ errors: [{ msg: error.message }] })
  }
})

// @route   PATCH api/user
// @desc    Update password
// @access  Public
router.patch('/updatePassword', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw new Error('User not found')
    }
    // const pass = await bcrypt.hash(req.body.password, 8)
    user.password = req.body.password
    await user.save()

    res.status(200).json({
      msg: 'Password updated',
    })
  } catch (error) {
    res.status(400).json({
      errors: [
        {
          msg: error.message,
        },
      ],
    })
  }
})

// @route   DELETE api/user
// @desc    Delete a user
// @access  Private
router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(500).json({ errors: [{ msg: error.message }] })
  }
})

module.exports = router
