const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.js')
const mongoose = require('mongoose')
const passport = require('passport')
const  app = express()


mongoose.connect('mongodb://127.0.0.1:27017/sergey')
    .then(function () {
        console.log("Mongo connected")
    }).catch(function (error) {
    console.log(error)
})
app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/auth',authRoutes)

module.exports = app
