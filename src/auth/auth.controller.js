const cron = require("node-cron");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const Auth = require("./auth.model");
const Service = require('../services/service.model')

exports.postAuth = asyncHandler(async (req, res) => {
    const existingUser = await Auth.findOne({ email: req.body.email });
    if (existingUser == null) {
        const user = await Auth.create(req.body);
        return res
            .status(200)
            .json(new ApiResponse("successfully added the information", user));
    } else {
        throw new ApiError("Email Already exists", 400);
    }
});

exports.getAuth = asyncHandler(async (req, res) => {
    const users = await Auth.find().sort({ status: 1 })
    if (!users) {
        throw new ApiError("no user is found");
    }
    return res
        .status(200)
        .json(new ApiResponse("here is the  users list ", users));
});

exports.getAuthById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existingUser = await Auth.findById(id);
    if (!existingUser) {
        throw new ApiError("user is not found");
    }
    return res
        .status(200)
        .json(new ApiResponse("here is the user ", existingUser));
});

exports.updateAuth = asyncHandler(async (req, res) => {
    const user = await Auth.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (!user) {
        throw new ApiError("user not found");
    } else {
        return res
            .status(200)
            .json(new ApiResponse("user updated successfully", user));
    }
});

exports.deleteAuth = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existingUser = await Auth.findOne({ _id: id });
    if (!existingUser) throw new ApiError("user is not exists");
    const user = await Auth.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse("user is deleted successfully"));
});


exports.filterAuth = asyncHandler(async (req, res) => {
    const { status } = req.query
    const data = await Auth.find({
        status: status
    })
    if (data.length == 0) {
        throw new ApiError('no user with this status', 400)
    }
    else {
        return res.status(200).json(new ApiResponse('here is user with this status', data))
    }
})