const mongoose = require('mongoose')

const emailPattern = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, 
        required: true,
        maxLength: 100
       
    },
    email :{
        type: String,
        unique: true,
        trim: true,
        required: true,
        match: emailPattern,
        maxLength: 50
    }, 
    password: {
        type: String,
        required: true,
        maxLength: 50
    }
})

module.exports = mongoose.model("users", userSchema)

