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

sentReqSchema.methods.toJSON = function () {
  const request = this
  const reqObj = request.toObject()
  reqObj.created_at = reqObj.created_at.toString()
  return reqObj
}

sentReqSchema.statics.findByUser = async ({ reqBy, forWhich, to }) => {
  const ride = await SentReq.findOne({
    reqBy,
    forWhich,
    to,
  })
  if (ride) {
    console.log('In if')
    throw new Error('Already requested')
  }
  return ride
}
const SentReq = mongoose.model('SentReq', sentReqSchema)

module.exports = SentReq
