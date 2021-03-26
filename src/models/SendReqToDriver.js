const mongoose = require('mongoose')

//* status - Pending, Accepted, Payment Received

const sentReqSchema = new mongoose.Schema(
  {
    reqBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    forWhich: {
      type: mongoose.Types.ObjectId,
      ref: 'Offers',
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

sentReqSchema.statics.findByUser = async ({ reqBy, to, forWhich }) => {
  const ride = await SentReq.findOne({
    reqBy,
    to: mongoose.Types.ObjectId(to),
    forWhich: mongoose.Types.ObjectId(forWhich),
  })
  if (ride) {
    console.log('In if')
    throw new Error('Already requested')
  }
  return ride
}

module.exports = SentReq = mongoose.model('SentReq', sentReqSchema)
