const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    name: {type: String, required: true},
    firstNote: Number,
    secondNote: Number,
    thirdNote: Number,
    fourthNote: Number,
    cpf: {type: Number, required: true}
})

