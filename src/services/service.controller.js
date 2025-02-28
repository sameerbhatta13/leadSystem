const Service = require('./service.model')
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");


exports.postService = asyncHandler(async (req, res) => {
    const { title } = req.body

    const newService = new Service({
        title
    })
    const existingService = await Service.findOne({ title: title })
    if (!existingService) {
        await newService.save()
        res.status(200).json(new ApiResponse('service is added', newService))
    }
    else {
        throw new ApiError('service is already exists !', 400)
    }
})

exports.getAllService = asyncHandler(async (req, res) => {
    const service = await Service.find().sort({ createdAt: 1 })
    if (!service) {
        throw new ApiError('none of service available')
    }
    return res.status(200).json(new ApiResponse('here is list of services', service))

})

exports.updateService = asyncHandler(async (req, res) => {
    const update = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!update) {
        throw new ApiError('service is not found')
    } else {
        return res.status(200).json(new ApiResponse('service updated successsfully', update))
    }
})


exports.deleteService = asyncHandler(async (req, res) => {
    const existingService = await Service.findOne({ _id: req.params.id })
    if (!existingService) {
        throw new ApiError('service is not available')
    }
    const service = await Service.findByIdAndDelete(req.params.id)
    return res.status(200).json(new ApiResponse('service deleted successfully'))
})