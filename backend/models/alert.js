const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sensor'
    },
    sensor_id: {
        type: String,
        required: true
    },
    alertText: {
        type: String,
        required: true
    }
})

const AlertModal = mongoose.model('alert',alertSchema);

module.exports = AlertModal;