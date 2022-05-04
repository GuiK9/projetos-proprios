const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { registerJoiSchema, loginJoiSchema } = require('../controlers/authControler')
const models = require('../models/models')


const register = (req, res) => {

    const body = req.body

    const dataValidated = registerJoiSchema(body)

    if (dataValidated.error != undefined) {
        res.status(400).send(dataValidated.error.message)
    } else {
        var passHash = crypto.createHash(process.env.CODEALGDB).update(dataValidated.value.password).digest("hex")
        dataValidated.value.password = passHash

        try {
            const AccountModel = new models.modelAccount({ name, cpf, password } = dataValidated.value)

            AccountModel.save((err) => {
                if (err) {
                    res.send(err.message)
                }
                else {
                    res.send(AccountModel)
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
    if (error) { res.status(400).send(error.message) } else {

        var passHash = crypto.createHash(process.env.CODEALGDB).update(body.password).digest("hex")
        body.password = passHash

        try {
            const AccountModel = models.modelAccount
            const checkedAccount = await AccountModel.find(body)

            const token = jwt.sign(JSON.stringify(checkedAccount[0]), process.env.PRIVATEKEYJWT, { algorithm: process.env.CODEALGJWT })

            res.send(token)
        } catch (err) {
            console.log('flag')
            res.status(500).send(err.message)
        }
    }

}


const newStudent = (req, res) => {

    const body = req.body

    try {

        const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)

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
            res.status(500).send(err.message)
        }

    } catch (err) {
        res.status(400).send(err.message)
    }




}

const allClass = async (req, res) => {

    const studentGradeModel = models.generateStundentGradeModel(req.params.class)

    try {
        const allDcomuments = await studentGradeModel.find({})
        res.send(allDcomuments)
    } catch (err) {
        res.status(500).send(err.message)
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
        res.status(500).send(err.message)
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
        res.status(500).send(err.message)
    }
}


module.exports = { newStudent, allClass, updateStudent, deleteStudent, login, register }