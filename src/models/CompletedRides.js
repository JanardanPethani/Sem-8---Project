const mongoose = require('mongoose')

const completedRides = new mongoose.Schema(
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
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)


module.exports = SentReq = mongoose.model('Completed', completedRides)
