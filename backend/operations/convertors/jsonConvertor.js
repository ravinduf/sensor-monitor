const { parse } = require("dotenv/types")

module.exports.convertToJSON = function(val) {
    return JSON.parse(val)
}