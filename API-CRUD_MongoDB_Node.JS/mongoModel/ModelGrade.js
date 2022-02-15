const mongoose = require('mongoose')

const studentGrade = mongoose.model('aluno', { 
    name: String,
    firstNote: Number,
    secondNote: Number,
    thirdNote: Number,
    fourthNote: Number,
})

module.exports = studentGrade