const mongoose = require('mongoose')

const completedRides = new mongoose.Schema(
  {
    reqBy: {
      type: String,
      required: true,
    },
    reqByM: {
      type: String,
      required: true,
    },
    driver: {
      type: String,
      required: true,
    },
    driverM: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    departedAt: {
      type: Date,
      required: true,
    },
    transaction_id: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

completedRides.methods.toJSON = function () {
  const request = this
  const reqObj = request.toObject()
  reqObj.departedAt = reqObj.departedAt.toString()
  return reqObj
}

module.exports = SentReq = mongoose.model('Completed', completedRides)
