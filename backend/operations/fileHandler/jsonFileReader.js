const fs = require('fs')
const path = require('path')


module.exports.readeFile = function(val) {
    
    try {
        const data = fs.readFileSync('./operations/fileHandler/sensors.json', 'utf-8')
       
        return data

    } catch (error) {

        console.log(error)       
    }

}