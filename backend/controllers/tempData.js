const processedReading = require('../models/processedReading')
const sensor = require('../models/processedReading')


const getData = async (req, res) => {
    
    console.log(req.query)
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

module.exports = {getData}