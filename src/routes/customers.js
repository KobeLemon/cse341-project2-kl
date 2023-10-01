const express = require('express');
const router = express.Router();

const usersController = require('../controllers/customers');

router.get('/', usersController.getAllCustomers);

router.get('/:id', usersController.getSingleCustomer);

router.post('/', usersController.createCustomer);

router.put('/:id', usersController.updateCustomer);

router.delete('/:id', usersController.deleteCustomer);

module.exports = router;