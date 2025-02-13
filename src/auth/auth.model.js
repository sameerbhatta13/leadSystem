const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    projectname: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'followup', 'cancel'],
        default: 'active'

    },
    folloUp: {
        type: String,
        default: () => new Date().toLocaleString()
    },
    isFollowUp: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })

module.exports = mongoose.model('Auth', authSchema)