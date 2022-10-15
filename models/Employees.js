const mongoose = require('mongoose')

const onlyLettersPattern = [/^[a-zA-Z]+$/]
const emailPattern = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]

const employeesSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true,
        maxLength: 100,
        match: onlyLettersPattern
    },
    last_name: {
        type: String,
        required: true,
        maxLength: 50,
        match: onlyLettersPattern
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxLength: 50,
        match: emailPattern
    },
    gender: {
        type: String,
        required: true,
        maxLength: 25,
        enum: ["Male", "Female", "Other"]
    },
    salary: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("employees", employeesSchema)