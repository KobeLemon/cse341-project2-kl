const express = require('express');
const router = express.Router();
const { customerValidation, validate } = require('../middleware/validation');

const usersController = require('../controllers/customers');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAllCustomers);
router.get('/:id', usersController.getSingleCustomer);

router.post('/', isAuthenticated, customerValidation, validate, usersController.createCustomer);
router.put('/:id', isAuthenticated, customerValidation, validate, usersController.updateCustomer);
router.delete('/:id', isAuthenticated, usersController.deleteCustomer);

module.exports = router;
