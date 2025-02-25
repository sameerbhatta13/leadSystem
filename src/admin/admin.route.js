const express = require('express')
const { postAdmin, postLogin, forgetPassword } = require('./admin.controller')

const router = express.Router()


router.post('/admin', postAdmin)
router.post('/admin/signin', postLogin)
router.post('/admin/reset', forgetPassword)


module.exports = router