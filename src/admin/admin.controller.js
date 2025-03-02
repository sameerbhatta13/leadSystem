const Admin = require('../admin/admin.model')
const bcrypt = require('bcrypt')
const ApiError = require('../utils/apiError')
const ApiResponse = require('../utils/apiResponse')
const asyncHandler = require('../utils/asyncHandler')
const { jwtToken } = require('../utils/jwtTokenGenerator')
const { sendEmailFP } = require('../utils/sendEmail')
const otpGenerator = require('../utils/otpGenerator')

exports.postAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const newAdmin = new Admin({
        email,
        password
    })
    const existingAdmin = await Admin.findOne({ email: newAdmin.email })

    if (existingAdmin) {
        throw new ApiError('admin already exists')
    }
    const admin = await newAdmin.save()

    return res.status(200).json(new ApiResponse('admin is saved in the database', admin))


})




exports.postLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) throw new ApiError('admin with this email does not exits', 403)

    if (admin.password !== password) {
        throw new ApiError('email or password does not match', 400)
    }

    const accessToken = jwtToken(admin._id)

    res.status(200).json(new ApiResponse('logged in successfully', accessToken))

})

exports.forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body

    const checkEmail = await Admin.findOne({ email: email })
    if (!checkEmail) {
        throw new ApiError('wrong email')
    }

    const newOtp = otpGenerator()
    sendEmailFP({
        to: checkEmail.email,
        subject: `Reset Password OTP`,
        html: `do not share your otp , use this otp to resent password </br> ${newOtp}`
    })
    res.json(new ApiResponse('otp is sent to reset passsword to your gmail'))


})


exports.adminDetails = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const admin = await Admin.findById(_id).select('-password')
    if (!admin) {
        throw new ApiError('admin is not found ', 400)
    }
    res.status(200).json(new ApiResponse('here is the admin info', admin))
})
exports.logout = asyncHandler(async (req, res) => {

})





