const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const routes = require("./src/routes/routes")



dotenv.config()

const app = express()

mongoose.connect("mongodb://localhost:27017/school").then(() => {
    console.log("DB connected")
}).catch(err => console.log(err))


app.use("/", routes)


module.exports = app.listen(process.env.PORT, () => {
    console.log("running")
})







