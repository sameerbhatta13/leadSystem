const Admin = require('../admin/admin.model')
const bcrypt = require('bcrypt')
const asyncHandler = require('../utils/asyncHandler')

exports.postAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body


})