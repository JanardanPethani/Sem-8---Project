require('dotenv').config()

const connect = require('./db/conn')
connect();

const app = require('./app')
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})