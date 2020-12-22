const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const env = require('dotenv')
const Alert = require('./models/alert')
const TemperatureLimit = require('./operations/checkTemperatureLimit')
const { Result } = require('express-validator')
env.config()
const app = express()

const DATABASE_URL = "mongodb+srv://new-user:software123@cluster0.pnwp2.mongodb.net/sensors?retryWrites=true&w=majority"

app.use(bodyParser.json({ extended: true }))

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection

const sensorCollection = db.collection('sensors')


db.on('error', error => console.error(error))

db.once('open', () => {
    console.log('conneted to monogdb')

    const changeStream = sensorCollection.watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const data = change.fullDocument
            if (TemperatureLimit.checkValue(data.data_value)) {
                const alert = new Alert({
                    sensor: data._id,
                    sensor_id: data.sensor_id,
                    alertText: "Temperature is gretter than 25C"
                })
                alert
                    .save()
                    .then(result => {
                        console.log(result)
                    })
                    .catch(err => {
                        res.status(404).json({
                            error: 'Error is occure'
                        });
                        console.log(err)
                    })

                    // notification seniding logic
                    
            } else {
                console.log("Temeperature is normal")
            }
            console.log(data)
        }
    })

})

app.use('/', require('./routes/indexRouter'))
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