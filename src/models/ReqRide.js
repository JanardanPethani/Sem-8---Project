const mongoose = require('mongoose')

const reqRideSchema = new mongoose.Schema({
    reqBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

reqRideSchema.methods.toJSON = function () {
    const request = this
    const reqObj = request.toObject()
    reqObj.departAt = reqObj.departAt.toString()
    reqObj.created_at = reqObj.created_at.toString()
    return reqObj
}

reqRideSchema.statics.findByLoc = async (userId, from, to) => {
    const ride = await ReqRide.findOne({ reqBy: userId, from: from, to: to })
    if (ride) {
        throw new Error('Already requested')
    }
    return ride
}

module.exports = ReqRide = mongoose.model('Requests', reqRideSchema)