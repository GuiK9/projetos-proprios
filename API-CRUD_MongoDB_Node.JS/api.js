const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const routes = require("./src/routes/routes")



dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_CONNECTION_URL).then(() => {
    console.log("DB connected")
}).catch(err => console.log(err))


app.use("/", routes)




/*  memory usage log

 setInterval(() => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`)

}, 100) */


module.exports = app.listen(process.env.PORT, process.env.HOST, () => {
    console.log("running")
})
