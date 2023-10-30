// Importing modules

const express = require("express")
const cors = require("cors")

// Importing routers

const userRouter = require("./routes/user")
const timeTableRouter = require("./routes/timetable")


// For serving static files

const path = require("path")


// Create server

const app = express()

// Middleware 

app.use(express.json())
app.use(cors())

// Using the routers 
app.use("/", userRouter)
app.use("/timetable", timeTableRouter)

// Exporting the server
module.exports = app