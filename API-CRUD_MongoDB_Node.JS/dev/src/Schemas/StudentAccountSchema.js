const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    name: {type: String, required: true},
    cpf: {type: String, required: true, minlength: 11, maxlength: 11},
    password: {type: String, required: true}
})