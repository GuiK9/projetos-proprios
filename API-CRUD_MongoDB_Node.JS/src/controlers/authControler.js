const joi = require('joi')


const registerJoiSchema = {
    fullName: joi.string().min(6).max(60).required(),
    nickName: joi.string().min(6).max(16).required(),
    password: joi.string().min(6).max(26).required()
}

const loginJoiSchema = {
    nickName: joi.string().min(6).max(16).required(),
    password: joi.string().min(6).max(26).required()
}

module.exports = {registerJoiSchema, loginJoiSchema}