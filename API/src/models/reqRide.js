const mongoose = require('mongoose')
const moment = require('moment');
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
        required: true,
        default: moment().add(20, 'minutes')
    }
})

reqRideSchema.statics.findByLoc = async (userId, from, to) => {
    const ride = await ReqRide.findOne({ reqBy: userId, from: from, to: to })
    if (ride) {
        throw new Error('Already requested')
    }
    return ride
}

reqRideSchema.methods.toJSON = function () {
    const request = this
    const reqObj = request.toObject()

    reqObj.departAt = moment(reqObj.departAt).format("dddd, MMMM Do YYYY, h:mm a")
    //delete reqObj.avatar
    // console.log('From toJSON');

    return reqObj
}
module.exports = ReqRide = mongoose.model('Requests', reqRideSchema)