const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRouter = require('./routers/user')
const mapRouter = require('./routers/map')
const reqRouter = require('./routers/requestRide')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/ride', reqRouter)
app.use(mapRouter)

module.exports = app