const express = require('express');
const router = express.Router();
const Alert = require('../models/alert');

router.get('/notification/:id',async (req,res) => {
    try{
        const sendAlerts = await Alert.find({sensor: req.params.id});
        return res.json(sendAlerts);

    }catch (err){
        res.status(400).json({message: 'Server Error'})
    }
})

router.get('/notification',async (req,res) => {
    try{
        const allAlerts = await Alert.find();
        return res.json(allAlerts);
    }catch (err){
        res.status(400).json({message: 'Server Error'})
    }
})