const { body, validationResult, check } = require("express-validator");
const ApiError = require("../utils/apiError");

exports.userValidation = [
  check("name")
    .optional()
    .notEmpty()
    .withMessage("name must be required")
    .isLength({ min: 2 })
    .withMessage("name must be atleast of three characters")
    .isString()
    .withMessage("name must be a string"),

  check("phone")
    .optional()
    .notEmpty()
    .withMessage("phone number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("enter a valid phone  number")
    // .matches(/g/).withMessage('enter a valid number ')
    .isNumeric()
    .withMessage("enter a valid number"),

  check("email")
    .optional()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email format is incorrect"),

  // check("service")
  //   .optional()
  //   .notEmpty()
  //   .withMessage("please select at least one service")
  //   .isIn([
  //     "MERN Stack",
  //     "Python Django",
  //     "Flutter",
  //     "App Development",
  //     "Web Development",
  //     "Digital Marketing",
  //     "Ui/Ux Design"])
  //   .withMessage("course must be one of the choice"),

  body("budget")
    .optional()
    .notEmpty()
    .withMessage("please provide a budget for service")
    .isNumeric()
    .withMessage("not a valid budget"),

  check("startDate")
    .optional()
    .notEmpty()
    .withMessage("provide a start date ")
    .custom((value) => {
      const visitDate = new Date(value);
      const today = new Date();

      visitDate.setUTCHours(0, 0, 0, 0);
      today.setUTCHours(0, 0, 0, 0);

      console.log(visitDate);
      console.log(today);

      if (visitDate < today) {
        throw new ApiError("visit date is not valid !, please enter a valid date");
      }
      return true;
    }),

  check("endDate")
    .if(body('startDate').exists()) //only chekcs when startdate is avalilable
    .optional()
    .notEmpty().withMessage('provide a end date also')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate)
      const endDate = new Date(value)

      startDate.setUTCHours(0, 0, 0, 0)
      endDate.setUTCHours(0, 0, 0, 0)

      if (endDate < startDate) {
        throw new ApiError('end date can not be less than start date')
      }
      return true
    }),

  check("remarks")
    .optional()
    .notEmpty().withMessage('please provide a remarks'),

  check("installment")
    .optional()
    .notEmpty().withMessage('provide a at least first installment')
    .custom((value, { req }) => {

      let installments = Array.isArray(value) ? value : [value];
      // if (!Array.isArray(value)) {
      //   throw new ApiError('installment should be array of numbers')
      // }

      console.log("first", value)
      const budget = req.body.total_budget

      installments.forEach((inst) => {
        if (typeof inst !== "number") {
          throw new ApiError('installment is should be array')
        }
        if (inst > budget) {
          throw new ApiError('installment cannot be greater than budget')
        }
      })
      return true
    })
];

//validation result handler

exports.validation = (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors)

  if (errors.isEmpty()) {
    return next()
  }

  return res.status(400).json({ error: errors.array()[0].msg })
}
