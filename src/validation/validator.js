const { body, validationResult } = require('express-validator')


exports.userValidation = [
    body('name')
        .notEmpty().withMessage('name must be required')
        .isLength({ min: 2 }).withMessage('name must be atleast of three characters')
        .isString().withMessage('name must be a string'),

    body('phone')
        .notEmpty().withMessage('phone number is required')
        .isLength({ max: 10 }).withMessage('enter a valid number')
        .matches(/g/).withMessage('enter a valid number ')
        .isNumeric().withMessage('enter a valid number'),

    body('projectname')
        .notEmpty().withMessage('project Name required')
        .isLength({ min: 3 }).withMessage('project name is smaller in length')
        .isString().withMessage('provide a valid project name'),

    body('service')
        .notEmpty().withMessage('provide your service')
        .isLength({ min: 2 }).withMessage('service name length is so small')
        .isString().withMessage('provide a name'),

    body('budget')
        .notEmpty().withMessage('please provide a budget')
        .isNumeric().withMessage('not a valid budget')



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