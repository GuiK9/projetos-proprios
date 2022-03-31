import express from "express";

const app = express()

app.listen(5000, (req, res)=>{
    console.log('running')
})

app.use("/", (req, res)=> {
    res.json({msg:"mano ta rudando!!!"})
})

