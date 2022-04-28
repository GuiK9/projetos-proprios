const studentGradeSchema = require('../Schemas/studentGradeSchema')
const StudentAccountSchema = require('../Schemas/StudentAccountSchema')
const mongoose = require("mongoose")

const modelAccount = mongoose.model(process.env.ACCOUNT, StudentAccountSchema)

const generateStundentGradeModel = function (classStudents) {
    return mongoose.model(classStudents, studentGradeSchema)
}

module.exports = { modelAccount, generateStundentGradeModel }