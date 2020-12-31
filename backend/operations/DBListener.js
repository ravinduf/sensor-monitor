const processedReading = require('../models/processedReading')
const convertToDateObject = require('./convertToDateObject')
const TemperatureLimit = require('./checkTemperatureLimit')
const user = require('../models/user')
const notificationSend = require('./notifications/notificationSender')

const DBListener = (changeStream) => {

    changeStream.on('change', (change) => {

        if (change.operationType === 'insert') {
            
            const data = change.fullDocument

            console.log('dbListener')
            const newProcessedReading = new processedReading({
                sensor_reading_id: data._id,
                sensor_id: data.sensor_id,
                reading_type: 'temperature',
                data_value: data.data_value,
                date: convertToDateObject(data.date)
            })

            if (TemperatureLimit.checkValue(data.data_value)) {
                user.find()
                    .exec()
                    .then(result => {
                        notificationSend.notificationSender(result)
                    })
                    .catch(err => {
                        console.log("Can not send Notifications")
                    })
                
                newProcessedReading.alert = {
                    alertStatus: true,
                    alertText: "Temperature is greater than threshold value"
                }
            }

            newProcessedReading
                .save()
                .then(result => {
                    
                })
                .catch(err => {
                    res.status(404).json({
                        error: 'Error is occure'
                    });
                    console.log(err)
                })

            
        }
    })
}

module.exports = DBListener
