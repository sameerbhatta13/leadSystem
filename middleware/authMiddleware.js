const Admin = require("../src/admin/admin.model");
const ApiError = require("../src/utils/apiError");
const asyncHandler = require("../src/utils/asyncHandler");
const jwt = require('jsonwebtoken')

const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const token = req.header("authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError('token is not found')
        }
        const { userId } = jwt.verify(token, process.env.TOKEN)
        const user = await Admin.findById(userId)

        if (!user) {
            throw new ApiError('Invalid token')
        }
        req.user = user
        next()

    } catch (error) {
        console.log(error.message, 400)

    }
})

module.exports = { authMiddleware }