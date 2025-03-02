const express = require('express')
const { postAdmin, postLogin, forgetPassword, adminDetails } = require('./admin.controller')
const { authMiddleware } = require('../../middleware/authMiddleware')

const router = express.Router()


router.post('/admin', postAdmin)
router.post('/admin/signin', postLogin)
router.post('/admin/reset', forgetPassword)
router.get('/admin', authMiddleware, adminDetails)


module.exports = router