const express = require('express')
const { postAuth, updateAuth, deleteAuth, getAuth, getAuthById, filterAuth } = require('./auth.controller')
const { userValidation, validation } = require('../validation/validator')

const router = express.Router()

router.post('/auth', userValidation, validation, postAuth)
router.get('/auth', getAuth)
router.get('/auth/:id', getAuthById)
router.put('/auth/:id', updateAuth)
router.delete('/auth/:id', deleteAuth)
router.get('/authfilter', filterAuth)

module.exports = router