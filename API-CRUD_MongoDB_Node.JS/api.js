const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const studentGradeSchema = require('./Schemas/studentSchema')


const app = express()
dotenv.config()

mongoose.connect("mongodb://localhost:27017/school").then(() => {
    console.log("DB connected")
}).catch(err => console.log(err))


app.use(bodyParser.json())


app.put("/input/:class", (req, res) => {

    const classStudents = req.params.class

    const studentGradeModel = mongoose.model(classStudents, studentGradeSchema)

    const student = new studentGradeModel({
        name: req.body.name,
        firstNote: req.body.firstNote,
        secondNote: req.body.secondNote,
        thirdNote: req.body.thirdNote,
        fourthNote: req.body.fourthNote,
    })

    try {
        student.save()
        res.send(student)
    } catch (err) {
        res.send(err)
    }
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