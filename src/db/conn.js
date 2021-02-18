const mongoose = require('mongoose')

const connectURL = process.env.DB_URL

mongoose.connect(connectURL, {
    //For deprication warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => {
    console.log('Connection successful!!');
}).catch((e) => {
    console.log('Error in connection' + e);
}) 