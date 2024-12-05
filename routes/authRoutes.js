const express=require("express")
const { login, register, reset } = require("../Controller/authController")
// const auth
const   router=express.Router()

router.post("/login",login)
router.post("/signup",register)
router.post("/reset",reset)
module.exports=router
