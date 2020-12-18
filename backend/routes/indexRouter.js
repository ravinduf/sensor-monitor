const express = require('express')
const router = express.Router()
const sensor = require('../models/sensor')


router.get('/sensorData', async (req, res) => {
    
    try{
        const sensorData = await sensor.find({})
        res.status(200).json(sensorData)
    }
    catch (err){
        console.log(err);
        res.status(200).json({message : "failure"})
    }
})

module.exports = router