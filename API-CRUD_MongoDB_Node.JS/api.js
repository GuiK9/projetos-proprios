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


function generateModel(classStudents) {
    return mongoose.model(classStudents, studentGradeSchema)

}



app.use(bodyParser.json())

app.post("/input/:class", (req, res) => {

    const body = req.body

    const studentGradeModel = generateModel(req.params.class)

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


app.get("/all/:class", async (req, res) => {

    const studentGradeModel = generateModel(req.params.class)

    try {
        const allDcomuments = await studentGradeModel.find({})
        res.send(allDcomuments)
    } catch (err) {
        res.send(err)
    }

})

app.delete("/delete/:class/:id", async (req, res) => {

    const studentGradeModel = generateModel(req.params.class)
    const id = req.params.id

    try {
        const documentToBeDeleted = await studentGradeModel.find({ _id: id }).then((documentDeleted) => {
            studentGradeModel.deleteOne({ _id: id }, (err) => {
                if (err) return err
            })
            res.send(documentDeleted)
        })
        res.send(documentToBeDeleted)
    } catch (err) {
        res.send(err)
    }

})

app.put("/update/:class/:id", async (req, res) => {

    const studentGradeModel = generateModel(req.params.class)
    const id = req.params.id
    const body = req.body


    const newObj = {
        name: body.name,
        firstNote: body.firstNote,
        secondNote: body.secondNote,
        thirdNote: body.thirdNote,
        fourthNote: body.fourthNote,
    }

    try {
        studentGradeModel.updateOne({ _id: id }, newObj).then(async (stats)=>{
            const newDocument = await studentGradeModel.findOne({ _id: id })
            res.send([stats, newDocument])

        })
    } catch (err) {
        res.status(400).send(err)
    }
})



app.listen(process.env.PORT, () => {
    console.log("rodando")
})








