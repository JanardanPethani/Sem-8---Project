const mongoose = require('mongoose')
const moment = require('moment');

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
    departAt: {
        type: Date,
        required: true,
        default: () => moment().add(20, 'minutes')
    }
})
offRideSchema.methods.toJSON = function () {
    const request = this
    const reqObj = request.toObject()

    reqObj.departAt = moment(reqObj.departAt).format("dddd, MMMM Do YYYY, h:mm a")
    //delete reqObj.avatar
    // console.log('From toJSON');

    return reqObj
}

offRideSchema.statics.findByLoc = async (userId, from, to) => {
    const ride = await OffRide.findOne({ offBy: userId, from: from, to: to })
    if (ride) {
        throw new Error('Already Offered')
    }
    return ride
}

module.exports = OffRide = mongoose.model('Offeres', offRideSchema)