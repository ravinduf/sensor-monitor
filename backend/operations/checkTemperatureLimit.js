const env = require('dotenv')
env.config()
const removeChar = require('./removeLastChar')
const temperature = process.env.SENSOR_TEMPERATURE

module.exports.checkValue = function (val) {
    var splitString = removeChar.removeLastCharacter(val)
    if (parseInt(splitString) > parseInt(temperature)) {
        return true
    } else {
        return false
    }
}