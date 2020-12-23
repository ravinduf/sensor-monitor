const express = require('express')
const router = express.Router()
const sensor = require('../models/sensor')
const {getData} = require('../controllers/tempData')


router.get('/tempData', getData)




module.exports = router