const { Point } = require('mapbox-gl')
const mongoose = require('mongoose')
const SendReq = require('./SendReqToDriver')

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

// longitude comes first while storing point
const offRideSchema = new mongoose.Schema(
  {
    offBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    from: {
      type: String,
      required: true,
    },
    location: {
      type: pointSchema,
      index: '2dsphere',
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    vehicletype: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    departAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

offRideSchema.methods.toJSON = function () {
  const request = this
  const reqObj = request.toObject()
  reqObj.departAt = reqObj.departAt.toString()
  reqObj.created_at = reqObj.created_at.toString()
  return reqObj
}

offRideSchema.statics.findByLoc = async (userId, from, to) => {
  const ride = await OffRide.findOne({
    offBy: userId,
    from: from,
    to: to,
  })
  // console.log(ride)
  if (ride) {
    throw new Error('Already Offered')
  }
  return ride
}

// Delete user tasks when user removed
offRideSchema.pre('remove', async function (next) {
  const offer = this
  const reqs = await SendReq.find({
    forWhich: offer.id,
  })
  // console.log(reqs)
  if (reqs.length !== 0) {
    throw new Error('Can not delete offer..')
  }
  next()
})

module.exports = OffRide = mongoose.model('Offers', offRideSchema)
