const cron = require('node-cron')
const ApiError = require('../utils/apiError')
const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/apiResponse')
const Auth = require('./auth.model')



exports.postAuth = asyncHandler(async (req, res) => {
    const { name, phone, email, service, budget, visitdate } = req.body

    const tDate = new Date()
    tDate.setDate(tDate.getDate())
    tDate.setHours(11, 0, 0, 0)

    const followupUTC = new Date(tDate.getTime() - (tDate.getTimezoneOffset() * 60000))


    let user = new Auth({
        name,
        phone,
        email,
        service,
        budget,
        visitdate,
        folloUp: followupUTC
    })

    const existingUser = await Auth.findOne({ email: user.email })

    if (existingUser == null) {
        user = await user.save()
        return res.status(200).json(new ApiResponse('successfully added the information', user))

    }
    else {
        throw new ('already exists')
    }


})

exports.getAuth = asyncHandler(async (req, res) => {
    const users = await Auth.find()
    if (!users) {
        throw new ApiError('no user is found')
    }
    // res.render('userlist', { user: users })
    return res.status(200).json(new ApiResponse('here is the  users list ', users))

})

exports.getAuthById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const existingUser = await Auth.findById(id)
    if (!existingUser) {
        throw new ApiError('user is not found')
    }
    return res.status(200).json(new ApiResponse('here is the user ', existingUser))
})


exports.updateAuth = asyncHandler(async (req, res) => {
    const user = await Auth.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        projectname: req.body.projectname,
        service: req.body.service,

    }, { new: true })

    if (!user) {
        throw new ApiError('user not found')
    }
    else {
        return res.status(200).json(new ApiResponse('user updated successfully', user))
    }
})

exports.deleteAuth = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id)

    const existingUser = await Auth.findOne({ _id: id })
    if (!existingUser)
        throw new ApiError('user is not exists')
    const user = await Auth.findByIdAndDelete(id)
    return res.status(200).json(new ApiResponse('user is deleted successfully'))
})

//get actions for user details
