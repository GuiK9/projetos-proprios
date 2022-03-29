const express = require("express")
const middlewares = require("../middlewares/middleware")
const bodyParser = require("body-parser")


const router = express.Router()


router.use(bodyParser.json())

router.post("/input/:class", middlewares.newStudent)

router.get("/all/:class", middlewares.allClass)

router.delete("/delete/:class/:id", middlewares.deleteStudent)

router.put("/update/:class/:id", middlewares.updateStudent)

module.exports = router