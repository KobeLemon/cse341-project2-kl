const { body, validationResult } = require('express-validator');

const employeeValidation = [
  body(
    'firstName',
    'Please enter a valid first name (cannot contain numbers, special characters, or be empty)',
  )
    .notEmpty()
    .isString(),
  body(
    'lastName',
    'Please enter a valid last name (cannot contain numbers, special characters, or be empty)',
  )
    .notEmpty()
    .isString(),
  body('email', 'Please enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  body(
    'facility',
    'Please enter a valid facility location (cannot contain numbers, special characters, or be empty)',
  )
    .notEmpty()
    .isString(),
  body(
    'department',
    'Please enter a valid Department name (cannot contain numbers, special characters, or be empty)',
  )
    .notEmpty()
    .isString(),
  body(
    'supervisor',
    'Please enter a valid Supervisor name (cannot contain numbers, special characters, or be empty)',
  )
    .notEmpty()
    .isString(),
  body(
    'hireDate',
    'Please enter a valid employee hire date. Must follow this format: YYYY-MM-DD',
  ).isISO8601(),
];

const customerValidation = [
  body(
    'firstName',
    'Please enter a valid first name (cannot contain numbers, special characters, or be empty)',
  )
    .notEmpty()
    .isString(),
  body(
    'lastName',
    'Please enter a valid last name (cannot contain numbers, special characters, or be empty)',
  )
    .notEmpty()
    .isString(),
  body('email', 'Please enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  body(
    'customerAcctNum',
    'Please enter a valid Customer Account Number (cannot be empty and must only contain numbers)',
  )
    .isNumeric()
    .not()
    .isEmpty(),
  body(
    'acctCreateDate',
    'Please enter a valid account creation date. Must follow this format: YYYY-MM-DD',
  ).isISO8601(),
];

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    res.json({ success: true });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  employeeValidation,
  customerValidation,
  validate,
};
