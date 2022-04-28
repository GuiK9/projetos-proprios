
const models = require('../models/models')
const crypto = require('crypto')
const { registerJoiSchema, loginJoiSchema } = require('../controlers/authControler')



const StudentAccountSchema = require('../Schemas/StudentAccountSchema')
const mongoose = require("mongoose")

const register = (req, res) => {

    const body = req.body

    const dataValidated = registerJoiSchema(body)

    if (dataValidated.error != undefined) {
        res.send(dataValidated.error.message)
    } else {
        var passHash = crypto.createHash(process.env.CODEHASHDB).update(dataValidated.value.password).digest("hex")
        dataValidated.value.password = passHash


        try {
            const Account = new models.modelAccount({ name, cpf, password } = dataValidated.value)

            Account.save((err) => {
                if (err) {
                    res.send(err.message)
                }
                else {
                    res.send(Account)
                }
            })
        } catch (err) {
            res.send(err)
        }
    }

}

const login = async (req, res) => {


    const body = req.body
    const { error } = loginJoiSchema(body)

    if (error) res.send(error.message)

    var passHash = crypto.createHash(process.env.CODEHASHDB).update(body.password).digest("hex")
    body.password = passHash

    try{

        const AccountModel = mongoose.model(process.env.ACCOUNT, StudentAccountSchema)
        
 
        const checked = await AccountModel.find({})

        console.log(checked)

        res.send(checked)
    } catch (err) {

    }

    
}


const newStudent = (req, res) => {

    const body = req.body

    const studentGradeModel = models.generateStundentGradeModel(req.params.class)

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

    const studentGradeModel = models.generateStundentGradeModel(req.params.class)

    try {
        const allDcomuments = await studentGradeModel.find({})
        res.send(allDcomuments)
    } catch (err) {
        res.send(err)
    }

}

const deleteStudent = async (req, res) => {

    const studentGradeModel = models.generateStundentGradeModel(req.params.class)
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

    const studentGradeModel = models.generateStundentGradeModel(req.params.class)
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