const mongoose = require('mongoose')

const gradeSchema = mongoose.model('aluno', { 
    name: String,
    firstNote: Number,
    secondNote: Number,
    thirdNote: Number,
    fourthNote: Number,
})

module.exports = gradeSchema