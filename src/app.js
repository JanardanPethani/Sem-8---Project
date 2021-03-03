require('./db/conn') //* to run file
const express = require('express')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/user')
const mapRouter = require('./routers/map')
const path = require('path')
const hbs = require('hbs')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(userRouter)
app.use(mapRouter)

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
//express searches templates in views by default so to change it..
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
//important to load html/css/js
app.use(express.static(publicDirPath))

module.exports = app