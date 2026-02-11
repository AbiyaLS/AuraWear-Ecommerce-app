import express from "express"
import { addToCart, updateCart, getUserCart } from "../controller/cartController.js"
import userAuth from "../middleware/auth/userAuth.js"

const router = express.Router()

router.post("/add", userAuth, addToCart)

router.put("/update", userAuth, updateCart)

router.get("/get", userAuth, getUserCart)


export default router 