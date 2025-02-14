const express = require('express')
const { postAuth, updateAuth, deleteAuth, getAuth, getAuthById } = require('./auth.controller')
const { userValidation, validation } = require('../validation/validator')

const router = express.Router()

router.post('/auth', userValidation, validation, postAuth)
router.get('/auth', getAuth)
router.get('/auth/:id', getAuthById)
router.put('/update/:id', updateAuth)
router.delete('/delete/:id', deleteAuth)

module.exports = router