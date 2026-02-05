import express from "express"
import { createProduct, getSingleProduct, listProducts, removeProduct } from "../controller/productController.js"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/auth/adminAuth.js"

const router = express.Router()
// this middleware is use to upload image of producr in file as a form data
router.post("/add", adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]), 
    createProduct)

router.get("/list",listProducts)
router.delete("/remove",adminAuth,removeProduct)
router.post("/single",getSingleProduct)

export default router