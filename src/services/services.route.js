const express = require('express')
const { postService, getAllService, updateService, deleteService } = require('./service.controller')

const router = express.Router()

router.post('/service', postService)
router.get('/service', getAllService)
router.put('/service/:id', updateService)
router.delete('/service/:id', deleteService)




module.exports = router