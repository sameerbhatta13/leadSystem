const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },

    phone: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        enum: ["MERN stack", "Python Django", "Flutter"],
        required: true
    },
    budget: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['pending', 'followup', 'cancel'],
        default: 'pending'

    },
    folloUp: {
        type: String,
        default: () => new Date()
    },
    visitdate: {
        type: Date,
    },
    isFollowUp: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })

module.exports = mongoose.model('Auth', authSchema)