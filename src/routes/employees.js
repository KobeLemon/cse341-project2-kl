const express = require('express');
const router = express.Router();

const usersController = require('../controllers/employees');

router.get('/', usersController.getAllEmployees);

router.get('/:id', usersController.getSingleEmployee);

router.post('/', usersController.createEmployee);

router.put('/:id', usersController.updateEmployee);

router.delete('/:id', usersController.deleteEmployee);

module.exports = router;