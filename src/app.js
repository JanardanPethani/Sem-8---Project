const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set("view engine", "hbs")
//express searches templates in views by default so to change it..
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get("/", (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    // console.log(publicDirPath)
    console.log('Server is up and running on ' + port)
})