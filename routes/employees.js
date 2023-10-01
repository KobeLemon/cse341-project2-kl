const express = require('express');
const router = express.Router();
const { employeeValidation, validate } = require('../validation');

const usersController = require('../controllers/employees');

router.get('/', usersController.getAllEmployees);

router.get('/:id', usersController.getSingleEmployee);

router.post('/', employeeValidation, validate, usersController.createEmployee);

router.put('/:id', employeeValidation, validate, usersController.updateEmployee);

router.delete('/:id', usersController.deleteEmployee);

module.exports = router;