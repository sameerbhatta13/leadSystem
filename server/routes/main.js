const express = require('express')
const User = require('../../src/auth/auth.model')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/about', (req, res) => {
    res.render('about')
})
router.get('/userlist', async (req, res) => {
    const users = await User.find({})
    res.render('userlist', { user: users, })
})

module.exports = router