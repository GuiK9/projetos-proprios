const joi = require('joi')


const registerJoiSchema = (data) => {

    const schema = joi.object({
        fullName: joi.string().required().min(6).max(60),
        nickName: joi.string().required().min(6).max(16),
        password: joi.string().required().min(6).max(26)
    })
    return schema.validate(data)
}

const loginJoiSchema = (data) => {

    const schema = joi.object({
    nickName: joi.string().min(6).max(16).required(),
    password: joi.string().min(6).max(26).required()
})

    return schema.validate(data)
}

module.exports = { registerJoiSchema, loginJoiSchema }