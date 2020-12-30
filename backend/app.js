const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const env = require('dotenv')
const { Result } = require('express-validator')
const DBListener = require('./operations/DBListener')
const notificationSend = require('./operations/notifications/notificationSender')
const user = require('./models/user')
env.config()
const app = express()

const DATABASE_URL = "mongodb+srv://new-user:software123@cluster0.pnwp2.mongodb.net/sensors?retryWrites=true&w=majority"

app.use(bodyParser.json({ extended: true }))

app.use(cors())

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true);

const db = mongoose.connection

const sensorCollection = db.collection('sensors')


db.on('error', error => console.error(error))

db.once('open', () => {
    console.log('conneted to monogdb')

    const changeStream = sensorCollection.watch();
    DBListener(changeStream);
})

app.use('/data', require('./routes/dataRouter'))
app.use('/signin',require('./routes/auth'))
app.use('/signup',require('./routes/users'))

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status(404)
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

const PORT = 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))