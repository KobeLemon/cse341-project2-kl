const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCustomers = async (req, res) => {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Get all Customers'
  try {
    const result = await mongodb.getDatabase().db('project2').collection('customers').find();
    result.toArray().then((customers) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(customers);
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleCustomer = async (req, res) => {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Get a single Customer'
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('project2')
      .collection('customers')
      .find({ _id: userId });
    result.toArray().then((customers) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(customers[0]);
    });
  } catch (error) {
    console.log(error);
  }
};

const createCustomer = async (req, res) => {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Create a new Customer'
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      customerAcctNum: req.body.customerAcctNum,
      acctCreateDate: req.body.acctCreateDate,
    };

    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('customers')
      .insertOne(user);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (error) {
    console.log(error);
  }
};

const updateCustomer = async (req, res) => {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Update an existing Customer'
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      customerAcctNum: req.body.customerAcctNum,
      acctCreateDate: req.body.acctCreateDate,
    };

    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('customers')
      .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomer = async (req, res) => {
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Delete an existing Customer'
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db('project2')
      .collection('customers')
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
