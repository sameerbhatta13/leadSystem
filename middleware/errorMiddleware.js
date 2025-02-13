// const { errorMonitor } = require('nodemailer/lib/xoauth2')

const notFound = (req, res, next) => {
    const error = new Error(`Route not found, ${req.originalUrl}`)
    next(error)
}

const erroMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500

    res.status(statusCode).json({
        message: error.message,
        statusCode: statusCode,
        stack: error.stack
    })
}

module.exports = { notFound, erroMiddleware }