const processedReading = require('../models/processedReading')
const sensor = require('../models/processedReading')


const getData = async (req, res) => {
    console.log(req)
    try{
        const tempData = await processedReading.find({reading_type: 'temperature'})
        res.status(200).json(tempData)
    }
    
    catch (err){
        res.status(400).json({message: 'Failure'})
    }
}

module.exports = {getData}