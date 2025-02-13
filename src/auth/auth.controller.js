const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const Auth = require("./auth.model");

exports.postAuth = asyncHandler(async (req, res) => {
  const { name, phone, project, service, budget } = req.body;
  let user = new Auth({
    name,
    phone,
    project,
    service,
    budget,
  });

  const existingUser = await Auth.findOne({ phone: user.phone });

  if (existingUser == null) {
    user = await user.save();
    return res
      .status(200)
      .json(new ApiResponse("successfully added the information", user));
  } else {
    throw new ApiError("already exists");
  }
});

exports.updateAuth = asyncHandler(async (req, res) => {
  const user = await Auth.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      project: req.body.project,
      service: req.body.service,
    },
    { new: true }
  );

  if (!user) {
    throw new ApiError("user not found");
  } else {
    return res
      .status(200)
      .json(new ApiResponse("user updated successfully", user));
  }
});
