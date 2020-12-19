const express = require('express')
const router = express.Router()
const sensor = require('../models/sensor')
const {getData} = require('../controllers/sensor')


router.get('/sensorData', getData)




module.exports = router