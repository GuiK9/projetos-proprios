const express = require('express')
const dotenv = require('dotenv')
const ModelGrade = require('./mongoModel/ModelGrade.js')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/test')

const app = express()
dotenv.config()


/* app.put('/input', (req, res) => {

    const aluno = new ModelGrade({
        name: "guilherme",
        firstNote: 9.1,
        secondNote: 8.7,
        thirdNote: 7.1,
        fourthNote: 9.7,
    })

    res.send(aluno)
}) */


app.get('/', (req, res)=> {
    const aluno = new ModelGrade({
        name: "guilherme",
        firstNote: 9.1,
        secondNote: 8.7,
        thirdNote: 7.1,
        fourthNote: 9.7,
    })
    console.log(aluno)
    res.send(aluno)
})


app.listen(process.env.PORT, () => {
    console.log("rodando")
})