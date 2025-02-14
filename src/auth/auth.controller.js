const ApiError = require('../utils/apiError')
const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/apiResponse')
const Auth = require('./auth.model')
const sendEmail = require('../utils/sendEmail')

exports.postAuth = asyncHandler(async (req, res) => {
    const { name, phone, email, service, budget } = req.body


    let user = new Auth({
        name,
        phone,
        email,
        service,
        budget
    })

    const existingUser = await Auth.findOne({ email: user.email })

    if (existingUser == null) {
        user = await user.save()

        if (user.status == 'pending') {
            await sendEmail({
                subject: ` MAKE A CALL TO ${user.name}`,
                html: `<h1>here is the detail information of the ${user.name}</h1>
                <p>student phone Number:<b> ${user.phone} </b></p>
                <p>student enquires for:<b> ${user.service}</b></p>
                <p>course fees:<b> ${user.budget} </b></p>
                `
            })
        }

        return res.status(200).json(new ApiResponse('successfully added the information', user))
    }
    else {
        throw new ('already exists')
    }

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