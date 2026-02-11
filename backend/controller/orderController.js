import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel";

// place order with cod 
export const placeOrder = async (req,res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData: {}})
        res.status(200).json({ message: "Placed Order" }) 
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}
// place order with Stripe 
export const placeOrderStripe = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
// place order with RazorPay 
export const placeOrderRazorPay = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
// place order for admin 
export const allOrdersAdmin = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
// place order for user
export const allOrderUser = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}
// update order status from admin panel
export const updateStatus = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


