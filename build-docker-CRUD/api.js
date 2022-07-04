const express = require('express')

const PORT = 2000
const HOST = '0.0.0.0'

const app = express()

app.get('/', (req, res)=>{
    res.send('oi mundo')
})

app.listen(PORT, HOST)