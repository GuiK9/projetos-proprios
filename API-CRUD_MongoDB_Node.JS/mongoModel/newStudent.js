const mongoose = require('mongoose')

function newStudent(classStudents, dataschema) {

    const gradeSchema = mongoose.model(classStudents, {
        name: String,
        firstNote: Number,
        secondNote: Number,
        thirdNote: Number,
        fourthNote: Number,
    })

    const aluno = new gradeSchema(dataschema)

    return aluno
}

module.exports =  newStudent 