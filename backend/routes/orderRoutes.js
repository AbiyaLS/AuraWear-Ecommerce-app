import express from "express"
import { allOrdersAdmin, allOrderUser, deleteOrder, placeOrder, placeOrderStripe, updateStatus, verifyStripe } from "../controller/orderController.js"
import adminAuth from "../middleware/auth/adminAuth.js"
import userAuth from "../middleware/auth/userAuth.js"

const router = express.Router()

// admin feature
router.post("/list",adminAuth, allOrdersAdmin)
router.post("/status",adminAuth, updateStatus)

// payment feature
router.post("/place",userAuth, placeOrder)

router.post("/stripe",userAuth, placeOrderStripe)


// User feature
router.post("/userorders",userAuth,allOrderUser)

// Verify Stripe
router.post("/verifyStripe",userAuth,verifyStripe)

router.post('/delete',adminAuth,deleteOrder)


export default router