const express = require("express")
const dotenv = require("dotenv")
const gradeSchema = require("./mongoModel/gradeSchema.js")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")


const app = express()
dotenv.config()

mongoose.connect("mongodb://localhost:27017/turma1").then(() => {
    console.log("DB connected")
}).catch(err => console.log(err))


app.use(bodyParser.json())



app.put("/input", (req, res) => {

    const aluno = new gradeSchema({
        name: req.body.name,
        firstNote: req.body.firstNote,
        secondNote: req.body.secondNote,
        thirdNote: req.body.thirdNote,
        fourthNote: req.body.fourthNote,
    })

    try {
        aluno.save()
        res.send(aluno)
    } catch (err) {
        res.send(err)
    }
})

app.get("/", (req, res) => {
    res.send("flagpcro")
})


app.listen(process.env.PORT, () => {
    console.log("rodando")
})





/* const aluno = new gradeSchema({
    name: "guilherme",
    firstNote: 9.1,
    secondNote: 8.7,
    thirdNote: 7.1,
    fourthNote: 9.7,
}) 
aluno.save()*/