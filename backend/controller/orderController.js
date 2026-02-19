import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Global Variables
const currency = "inr";
const DeliveryCharge = 50;

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place order with COD
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({ message: "Placed Order" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // ✅ return { message }
  }
};

// place order with Stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    // ✅ Fix: origin fallback for prod
    const origin = req.headers.origin || process.env.FRONTEND_URL;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: Number(item.price) * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: DeliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.status(200).json({ session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // ✅ return { message }
  }
};

// Verify Stripe Payment
export const verifyStripe = async (req, res) => {
  try {
    const { success, orderId } = req.body;
    const userId = req.userId;

    // ✅ Fix: handle boolean or string
    if (success === true || success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.status(200).json({ message: "Payment Verified Successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(200).json({ message: "Payment cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // ✅ return { message }
  }
};

// admin: all orders
export const allOrdersAdmin = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // ✅ return { message }
  }
};

// user: all orders
export const allOrderUser = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // ✅ return { message }
  }
};

// admin: update status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // ✅ return { message }
  }
};


// delete order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    await orderModel.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
