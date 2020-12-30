const fs = require('fs')
module.exports.readeFile = function(val) {
    fs.readFile('../resources/sensors.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err)
            return
        } else {
            return data
        }
    })
}