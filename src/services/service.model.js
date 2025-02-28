const mongoose = require('mongoose')

const serviceModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }

}, { timestamps: true })
module.exports = mongoose.model("Service", serviceModel)