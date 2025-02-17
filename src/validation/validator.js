const { body, validationResult, check } = require('express-validator')
const ApiError = require('../utils/apiError')


exports.userValidation = [
    check('name')
        .notEmpty().withMessage('name must be required')
        .isLength({ min: 2 }).withMessage('name must be atleast of three characters')
        .isString().withMessage('name must be a string'),

    check('phone')
        .notEmpty().withMessage('phone number is required')
        .isLength({ min: 10, max: 10 }).withMessage('enter a valid phone  number')
        // .matches(/g/).withMessage('enter a valid number ')
        .isNumeric().withMessage('enter a valid number'),

    check('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('email format is incorrect'),

    // body('projectname')
    //     .notEmpty().withMessage('project Name required')
    //     .isLength({ min: 3 }).withMessage('project name is smaller in length')
    //     .isString().withMessage('provide a valid project name'),

    check('service')
        .notEmpty().withMessage('please select at least one')
        .isIn(["MERN stack", "Python Django", "Flutter"]).withMessage('course must be one of Mern Stack python flutter '),

    check('budget')
        .notEmpty().withMessage('please provide a budget')
        .isNumeric().withMessage('not a valid budget'),

    check('visitdate')
        .notEmpty().withMessage('provide a date ')
        .custom((value) => {
            const visitDate = new Date(value)
            const today = new Date()

            visitDate.setUTCHours(0, 0, 0, 0);
            today.setUTCHours(0, 0, 0, 0);

            console.log(visitDate)
            console.log(today)


            if (visitDate < today) {
                throw new ApiError('date is not valid !, please enter a valid date')
            }
            return true
        })
]

//validation result handler

exports.validation = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)

    if (errors.isEmpty()) {
        return next()
    }

    return res.status(400).json({ error: errors.array()[0].msg })
}