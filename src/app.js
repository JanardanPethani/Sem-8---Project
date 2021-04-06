const express = require('express')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRouter = require('./routers/api/user')
const mapRouter = require('./routers/api/map')
const reqRouter = require('./routers/api/requestRide')
const offRouter = require('./routers/api/offerRide')
const authRouter = require('./routers/api/auth')
const matchRouter = require('./routers/api/matchRide')
const sendReqMsg = require('./routers/api/ReqMsg')
const paymentRouter = require('./routers/api/payment')

const app = express()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use('/public', express.static('public'))
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/ride', reqRouter)
app.use('/api/ride', offRouter)
app.use('/api/auth', authRouter)
app.use('/api/map', mapRouter)
app.use('/api/match', matchRouter)
app.use('/api/sendReqMsg', sendReqMsg)
app.use('/api/pay', paymentRouter)

module.exports = app
