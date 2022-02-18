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


function generateModel(classStudents){
    return mongoose.model(classStudents, studentGradeSchema)

}


app.put("/input/:class", (req, res) => {

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

    try{
        const documentToBeDeleted = await studentGradeModel.find({_id:id}).then((documentDeleted)=>{
            studentGradeModel.deleteOne({_id:id}, (err)=>{
                if (err) return err
            })
            res.send(documentDeleted)
        })
        res.send(documentToBeDeleted)
    } catch (err) {
        res.send(err)
    }

})



app.listen(process.env.PORT, () => {
    console.log("rodando")
})
