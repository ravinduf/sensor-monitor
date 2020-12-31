const env = require('dotenv')
env.config()
const removeChar = require('./removeLastChar')
const jsonFileRead = require('./fileHandler/jsonFileReader')
const jsonConvert = require('./convertors/jsonConvertor')

module.exports.checkValue = function (val) {

    var splitString = removeChar.removeLastCharacter(val)
    var temp = jsonFileRead.readeFile()
    var convertTemp = jsonConvert.convertToJSON(temp)

    if (parseFloat(splitString) > parseFloat(convertTemp.Sensor_Temperature)) {
        
        return true
    } else {
        return false
    }
}