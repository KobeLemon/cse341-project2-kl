const express = require('express');
const router = express.Router();
const { employeeValidation, validate } = require('../middleware/validation');

const usersController = require('../controllers/employees');
const { isAuthenticated} = require('../middleware/authenticate');

router.get('/', usersController.getAllEmployees);
router.get('/:id', usersController.getSingleEmployee);

router.post('/', isAuthenticated, employeeValidation, validate, usersController.createEmployee);
router.put('/:id', isAuthenticated, employeeValidation, validate, usersController.updateEmployee);
router.delete('/:id', isAuthenticated, usersController.deleteEmployee);

module.exports = router;