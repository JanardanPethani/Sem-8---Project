const mongoose = require('mongoose')

const offRideSchema = new mongoose.Schema({
    offBy: {
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
    price: {
        type: Number,
        required: true
    },
    vehicletype: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    departAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
offRideSchema.methods.toJSON = function () {
    const request = this
    const reqObj = request.toObject()
    reqObj.departAt = reqObj.departAt.toString()
    reqObj.created_at = reqObj.created_at.toString()
    return reqObj
}

offRideSchema.statics.findByLoc = async (userId, from, to, vehicletype) => {
    const ride = await OffRide.findOne({ offBy: userId, from: from, to: to, vehicletype: vehicletype })
    if (ride) {
        throw new Error('Already Offered')
    }
    return ride
}

module.exports = OffRide = mongoose.model('Offers', offRideSchema)