const express = require("express")
const mongoose = require("mongoose")

const routes = express.Router()

const UserModel = require("../models/Users")

let validate = require("../modules/validation")

routes.post("/signup", async (req, res) => {
    
    try {
        // create a new user from body parameters 
        const newUser = new UserModel(req.body)
        // save new user in the database
        const user = await newUser.save()
        // display the new user 
        res.status(201).send(user)

    } catch (error) {
        // error check for input fields
        if (error.code === 11000) {
            validate.displayMessage(res, 400, false, "user already exists")
        }
        else if (error.errors.username) {
            validate.displayMessage(res, 400, false, "username field can not be empty")
        }
        else if (error.errors.email) {
            validate.displayMessage(res, 400, false, "incorrect format. for email use example@example.com pattern")
        } 
        else if (error.errors.password) {
            validate.displayMessage(res, 400, false, "password field can not be empty")
        } else {
            res.status(400).send({ message: error.message })
        }
    }
})


routes.post("/login", async (req, res) => {
    try {
        // get values from body and find them in database
        const findByUsername = await UserModel.findOne({ username: req.body.username }).exec()
        const findByPassword = await UserModel.findOne({ password: req.body.password }).exec()
        const findByEmail = await UserModel.findOne({ email: req.body.email }).exec()

        // check if user login information is valid
        // if email or username and password are correct display success message
        if ((findByUsername || findByEmail) && findByPassword) {
            validate.displayMessage(res, 200, true, `User logged in successfully ${req.body.email || req.body.username} `)
        }
        // if password dont match email/username
        else if (!findByPassword && (findByUsername || findByEmail)) {
            validate.displayMessage(res, 400, false, "invalid password")
        }
        // if email/username dont match the password
        else if ((!findByUsername || !findByEmail) && findByPassword) {
            validate.displayMessage(res, 400,false, "invalid username or email")
        }
          // if email/username and password are wrong display the error message
        else if ((!findByUsername || !findByEmail) && !findByPassword) {
            validate.displayMessage(res, 400,false, "invalid username, email and password")
        }

    } catch (error) {
        // send error message if any occurred
        res.status(400).send({ message: error.message })
    }
})


module.exports = routes