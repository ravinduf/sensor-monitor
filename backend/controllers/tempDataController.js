const processedReading = require('../models/processedReading')


const getData = async (req, res) => {

    console.log(req.query)
    const queryStatement = {
        reading_type: 'temperature'
    }
    
    if (req.query.startDate && req.query.endDate) {
        queryStatement.date = { $gte : req.query.startDate, $lte : req.query.endDate }
    }
    else if (req.query.startDate){
        queryStatement.date = { $gte : req.query.startDate}
    }
    else if (req.query.endDate) {
        queryStatement.date = { $lte : req.query.endDate}
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
        const alerts = await processedReading.find( {reading_type: 'temperature', 'alert.alertStatus' : true })
        console.log(alerts.length)    
        res.status(200).json(alerts)
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "failure"})
    }
}

module.exports = {getData, getTempAlerts}