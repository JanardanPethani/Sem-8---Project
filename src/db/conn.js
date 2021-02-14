const mongoose = require('mongoose')

const connectURL = 'mongodb://localhost:27017/GetYourRide'

mongoose.connect(connectURL, {
    //For deprication warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connection successful!!');
}).catch((e) => {
    console.log('Error in connection' + e);
}) 