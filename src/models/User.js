const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Requests = require('./ReqRide')
const Offers = require('./OffRide')

//Schemas
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 13,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

userSchema.virtual('requests', {
  ref: 'Requests',
  localField: '_id',
  foreignField: 'reqBy',
})
userSchema.virtual('offers', {
  ref: 'Offers',
  localField: '_id',
  foreignField: 'offBy',
})

// ( instance method ) std function bcz of binding
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const payload = {
    user: {
      id: user.id.toString(),
    },
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '3600s',
  })
  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

// Don't send pass and tokens after login
//* toJSON method is called by express when ver obj is sent to client
userSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  delete userObj.password
  delete userObj.tokens
  delete userObj.createdAt
  delete userObj.updatedAt
  //delete userObj.avatar
  // console.log('From toJSON');

  return userObj
}

// own static method / model method
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Invalid Credentials')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid Credentials')
  }

  return user
}

// hashing password before save
userSchema.pre('save', async function (next) {
  //this gives access to individual user
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

// Delete user tasks when user removed
userSchema.pre('remove', async function (next) {
  const user = this
  await Requests.deleteMany({ reqBy: user.id })
  await Offers.deleteMany({ offBy: user.id })

  next()
})

module.exports = User = mongoose.model('User', userSchema)
