const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRouter = require('./routers/api/user')
const mapRouter = require('./routers/api/map')
const reqRouter = require('./routers/api/requestRide')
const offRouter = require('./routers/api/offerRide')
const authRouter = require('./routers/api/auth')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/api/user', userRouter)
app.use('/api/ride', reqRouter)
app.use('/api/ride', offRouter)
app.use('/api/auth', authRouter)
app.use('/api/map', mapRouter)

module.exports = app