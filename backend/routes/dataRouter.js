const express = require('express')
const router = express.Router()
const sensor = require('../models/sensor')
const {getData , getAlerts} = require('../controllers/DataController')


router.get('/', getData)
router.get('/alerts', getAlerts)


module.exports = router