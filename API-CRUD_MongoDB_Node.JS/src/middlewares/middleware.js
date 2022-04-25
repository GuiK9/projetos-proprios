
const studentGradeSchema = require('../Schemas/studentSchema')
const { registerJoiSchema, loginJoiSchema } = require('../controlers/authControler')
const mongoose = require("mongoose")


function generateModel(classStudents) {
    return mongoose.model(classStudents, studentGradeSchema)
}

const register = (req, res) => {

    const body = req.body

    res.send(registerJoiSchema(body))

    //cpf vai pro cadastro do aluno para que ele use de senha padrão para login

}

const login = (req, res) => {

}


const newStudent = (req, res) => {

    const body = req.body

    const studentGradeModel = generateModel(req.params.class)

    try {
        const student = new studentGradeModel({
            name, firstNote, secondNote, thirdNote, fourthNote,
        } = body)

        student.save((err) => {
            if (err) {
                res.send(err.message)
            }
            else {
                res.send(student)
            }
        })

    } catch (err) {
        res.send(err)
    }
}

const allClass = async (req, res) => {

    const studentGradeModel = generateModel(req.params.class)

    try {
        const allDcomuments = await studentGradeModel.find({})
        res.send(allDcomuments)
    } catch (err) {
        res.send(err)
    }

}

const deleteStudent = async (req, res) => {

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

}

const updateStudent = async (req, res) => {

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
        studentGradeModel.updateOne({ _id: id }, newObj).then(async (stats) => {
            const newDocument = await studentGradeModel.findOne({ _id: id })
            res.send([stats, newDocument])

        })
    } catch (err) {
        res.status(400).send(err)
    }
}


module.exports = { newStudent, allClass, updateStudent, deleteStudent, login, register }