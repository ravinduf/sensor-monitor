const processedReading = require('../models/processedReading')
const sensor = require('../models/processedReading')


const getData = async (req, res) => {

    const queryStatement = {
        reading_type: 'temperature'
    }
    
    if (req.query.start && req.query.end) {
        queryStatement.date = { $gte : req.query.start, $lte : req.query.end }
    }
    else if (req.query.start){
        queryStatement.date = { $gte : req.query.start}
    }
    else if (req.query.end) {
        queryStatement.date = { $lte : req.query.end}
    }
    
    console.log(queryStatement)
    
    try{
        
        const tempData = await processedReading.find(queryStatement)
        console.log(tempData.length)
        res.status(200).json(tempData)
    }
    
    catch (err){
        console.log(err)
        res.status(400).json({message: 'Failure'})
    }
}

const getTempAlerts = async (req, res) => {
    
    try {
        const alerts = await processedReading.find({ alert : { alertStatus : true}})    
        res.status(200).json(alerts)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "failure"})
    }
}

module.exports = {getData, getTempAlerts}