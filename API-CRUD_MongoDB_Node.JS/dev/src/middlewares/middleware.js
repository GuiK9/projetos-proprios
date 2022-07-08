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

            const tokenObj = {token}

            res.send(JSON.stringify(tokenObj))
        } catch (err) {
            res.status(500).send(err.message)
        }
    }

}


const newStudent = async (req, res) => {

    const body = req.body

    try {

        const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)
        const AccountModel = models.modelAccount
        const checkedAccount = await AccountModel.findOne(jsonJwt)

        if (checkedAccount === null) {
            const err = { message: "you are not registered" }
            throw err
        }

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


    const body = req.body

    try {
        const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)
        const AccountModel = models.modelAccount
        const checkedAccount = await AccountModel.findOne(jsonJwt)

        if (checkedAccount === null) {
            const err = { message: "you are not registered" }
            throw err
        }

        const studentGradeModel = models.generateStundentGradeModel(req.params.class)

        const allDcomuments = await studentGradeModel.find({})
        res.send(allDcomuments)
    } catch (err) {
        res.status(500).send(err.message)
    }

}

const deleteStudent = async (req, res) => {

    const body = req.body

    try {

        const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)
        const AccountModel = models.modelAccount
        const checkedAccount = await AccountModel.findOne(jsonJwt)

        if (checkedAccount === null) {
            const err = { message: "you are not registered" }
            throw err
        }



        const studentGradeModel = models.generateStundentGradeModel(req.params.class)
        const id = req.params.id


        const documentToBeDeleted = await studentGradeModel.findOne({ _id: id }).then( async (documentDeleted) => {
        
            const DBresp = await studentGradeModel.deleteOne({ _id: id })

            if( DBresp.deletedCount ===  0 ){
                res.status(404).send(JSON.stringify(DBresp))
                return
            }

            res.send(documentDeleted)
        })

    } catch (err) {
        res.status(500).send(err.message) 
    }

}

const updateStudent = async (req, res) => {

    const body = req.body


   try {
       
    const jsonJwt = jwt.verify(body.token, process.env.PRIVATEKEYJWT)
    const AccountModel = models.modelAccount
    const checkedAccount = await AccountModel.findOne(jsonJwt) 

    if (checkedAccount === null) {
        const err = { message: "you are not registered" }
        throw err
    }



    const studentGradeModel = models.generateStundentGradeModel(req.params.class)
    const id = req.params.id


    const newObj = {
        name: body.name,
        firstNote: body.firstNote,
        secondNote: body.secondNote,
        thirdNote: body.thirdNote,
        fourthNote: body.fourthNote,
    }

 
        studentGradeModel.updateOne({ _id: id }, newObj).then(async (stats) => {
            const newDocument = await studentGradeModel.findOne({ _id: id })
            res.send([stats, newDocument])
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports = { newStudent, allClass, updateStudent, deleteStudent, login, register }