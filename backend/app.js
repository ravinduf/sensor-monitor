const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const DATABASE_URL = "mongodb+srv://new-user:software123@cluster0.pnwp2.mongodb.net/sensors?retryWrites=true&w=majority"

app.use(bodyParser.json({extended: true }))

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', error => console.error(error))

db.once('open', () => {
    console.log('conneted to monogdb')
})

app.use('/', require('./routes/indexRouter'))

const PORT = 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))