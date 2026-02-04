import express from "express"
import { adminLogin, userLogin, userRegister } from "../controller/userController.js"

const router = express.Router()

router.post("/login",userLogin)
router.post("/register", userRegister)
router.post("/admin", adminLogin)

export default router