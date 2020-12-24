const express = require('express')
const router = express.Router()
const sensor = require('../models/sensor')
const {getData , getTempAlerts} = require('../controllers/tempData')


router.get('/tempData', getData)
router.get('/tempAlerts', getTempAlerts)


module.exports = router