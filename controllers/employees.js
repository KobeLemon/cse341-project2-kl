const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllEmployees = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('project2').collection('employees').find();
        result.toArray().then((employees) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employees);
        });    
    } catch (error) {
        console.log(error);
    }
};

const getSingleEmployee = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('project2').collection('employees').find({_id: userId});
        result.toArray().then((employees) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employees[0]);
        });    
    } catch (error) {
        console.log(error);
    }
    
};

const createEmployee = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            facility: req.body.facility,
            department: req.body.department,
            supervisor: req.body.supervisor,
            hireDate: req.body.hireDate
        };

        const response = await mongodb.getDatabase().db('project2').collection('employees').insertOne(user);
        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.')
        }    
    } catch (error) {
        console.log(error);
    }
    
};

const updateEmployee = async (req, res) => {
    try {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        facility: req.body.facility,
        department: req.body.department,
        supervisor: req.body.supervisor,
        hireDate: req.body.hireDate
    };
    const response = await mongodb.getDatabase().db('project2').collection('employees').replaceOne({ _id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }    
    } catch (error) {
        console.log(error);
    }
    
};

const deleteEmployee = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('project2').collection('employees').deleteOne({ _id: userId});
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
    getAllEmployees,
    getSingleEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};