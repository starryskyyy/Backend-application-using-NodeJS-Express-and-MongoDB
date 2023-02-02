require("dotenv").config()
const express = require("express")
const userRoutes = require("./routes/users")
const employeesRoutes = require("./routes/employees")
const mongoose = require("mongoose")
// create database connection
const DB_CONNECTION_STRING = process.env.DATABASE_URL

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const app = express()

const SERVER_PORT = process.env.PORT || 3000

const cors = require("cors");
app.use(cors({ credentials: true, origin: "*" }));

app.use(express.json())
app.use(express.urlencoded())


// use routes 
app.use("/api/user/", userRoutes)
app.use("/api/emp/", employeesRoutes)
 
app.route("/")
    .get((req, res) => {
        res.send("<h1>Assignment 2<br>Elizaveta Vygovskaia<br>101337015</h1>")
    })



app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})