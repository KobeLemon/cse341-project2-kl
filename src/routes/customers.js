const express = require('express');
const router = express.Router();
const { customerValidation, validate } = require('../validation');

const usersController = require('../controllers/customers');

router.get('/', usersController.getAllCustomers);

router.get('/:id', usersController.getSingleCustomer);

router.post('/', customerValidation, validate, usersController.createCustomer);

router.put('/:id', customerValidation, validate, usersController.updateCustomer);

router.delete('/:id', usersController.deleteCustomer);

module.exports = router;