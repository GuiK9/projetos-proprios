const joi = require('joi')


const registerJoiSchema = (data) => {

    const schema = joi.object({
        name: joi.string().required().min(6).max(60),
        cpf: joi.string().required().min(11).max(11),
        password: joi.string().required().min(6).max(26)
    })
    return schema.validate(data)
}

const loginJoiSchema = (data) => {

    const schema = joi.object({
    name: joi.string().min(6).max(60).required(),
    password: joi.string().required()
})

    return schema.validate(data)
}

module.exports = { registerJoiSchema, loginJoiSchema }