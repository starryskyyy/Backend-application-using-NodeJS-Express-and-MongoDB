
const express = require("express")
const userRoutes = require("./routes/users")
const employeesRoutes = require("./routes/employees")

const mongoose = require("mongoose")
// create database connection
const DB_CONNECTION_STRING = "mongodb+srv://elizaveta_vy:amDJzzxqQDkIRHEr@cluster0.lpjzsdr.mongodb.net/101337015_assignment_1?retryWrites=true&w=majority"

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const app = express()


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



app.listen(process.env.PORT || 3000, () =>{
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}/`)
})