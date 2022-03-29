const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    name: String,
    firstNote: Number,
    secondNote: Number,
    thirdNote: Number,
    fourthNote: Number,
})

