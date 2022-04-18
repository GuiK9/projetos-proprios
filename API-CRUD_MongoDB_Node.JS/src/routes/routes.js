const express = require("express")
const middlewares = require("../middlewares/middleware")
const bodyParser = require("body-parser")


const router = express.Router()


router.use(bodyParser.json())

router.get("/all/:class", middlewares.allClass)

router.post("/input/:class", middlewares.newStudent)

router.post("/register", middlewares.register)

router.post("/login", middlewares.login)

router.delete("/delete/:class/:id", middlewares.deleteStudent)

router.put("/update/:class/:id", middlewares.updateStudent)


module.exports = router