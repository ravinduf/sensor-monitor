const sensor = require('../models/sensor')


const getData = async (req, res) => {

    try{
        const sensorData = await sensor.find({})
        res.status(200).json(sensorData)
    }
    
    catch (err){
        res.status(400).json({message: 'Failure'})
    }
}


const checkForAlert = () => {

}


module.exports = {getData}