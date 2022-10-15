const express = require("express")
const mongoose = require("mongoose")

const routes = express.Router()

let validate = require("../modules/validation")

const EmployeeModel = require("../models/Employees")

// get employee list
routes.get("/employees", async (req, res) => {
    try {
        const employees = await EmployeeModel.find()
        // if employees database is empty display error message
        if (employees.length == 0) {
            res.status(400).send(validate.displayMessage(false, "no employees were found"))
        }
        else {
            // display employees
            res.status(200).send(employees)
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// create new employee
routes.post("/employees", async (req, res) => {

    try {
        
        const newEmployee = new EmployeeModel(req.body)
        const employee = await newEmployee.save()
        res.status(201).send(employee)

    } catch (error) {
        // if employee is already exists
        if (error.code === 11000) {
            res.status(400).json(validate.displayMessage(false, `employee with email: ${req.body.email} already exists`))
        }
        else if (error.errors.first_name || error.errors.last_name) {
            res.status(400).json(validate.displayMessage(false, "incorrect format. for first name and last name use letters only"))
        }
        else if (error.errors.email) {
            res.status(400).json(validate.displayMessage(false, "incorrect format. for email use example@example.com pattern"))
        }

        else if (error.errors.gender) {
            res.status(400).json(validate.displayMessage(false, "incorrect gender value. for gender use only male, female or other"))
        }
        else if (error.errors.salary) {
            res.status(400).json(validate.displayMessage(false, "incorrect format. for salary use digits only"))
        }
        else {
            res.status(400).send({ message: error.message })
        }
    }
})

// get employee details by id
routes.get("/employees/:eid", async (req, res) => {
    try {

        const employee = await EmployeeModel.findById(req.params.eid);

        if (employee == null) {
            res.status(400).send({ message: `employee with id: ${req.params.eid} was not found` });
        }
        else {
            // display employee
            res.status(200).json(employee)
        }

    }
    catch (error) {
        // if employee was not found
        res.status(400).json({ message: error.message })
    }
})

// update employee 
routes.put("/employees/:eid", async (req, res) => {

    try {

        const updateEmployee = await EmployeeModel.findByIdAndUpdate(req.params.eid, req.body, { runValidators: true })

        if (updateEmployee == null) {
            res.status(400).send({ message: `employee with id: ${req.params.eid} was not found` });
        }
        else {
            // display employee
            res.status(200).send(updateEmployee)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete employee
routes.delete("/employees", async (req, res) => {
    try {
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.query.eid)
        // if employee exists delete record
        if (deletedEmployee) {
            res.status(204).send(deletedEmployee)
        } else {
            // if employee was not found
            res.status(400).send({ message: `employee with id ${req.query.eid} was not found` })
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})


module.exports = routes