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
    const body = req.body

    const studentGradeModel = mongoose.model(classStudents, studentGradeSchema)

    const student = new studentGradeModel({
        name: body.name,
        firstNote: body.firstNote,
        secondNote: body.secondNote,
        thirdNote: body.thirdNote,
        fourthNote: body.fourthNote,
    })

    try {
        student.save()
        res.send(student)
    } catch (err) {
        res.send(err)
    }
})


app.get('/all/:class', async (req, res) => {

    const classStudents = req.params.class
    const studentGradeModel = mongoose.model(classStudents, studentGradeSchema)

    try {
        const allDcomuments = await studentGradeModel.find({})
        console.log(allDcomuments)
        res.send(allDcomuments)
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