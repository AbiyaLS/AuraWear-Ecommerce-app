import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "../backend/routes/userRoutes.js"
import productRouter from "../backend/routes/productRoutes.js"
import cartRouter from "../backend/routes/cartRoutes.js"
import orderRouter from "../backend/routes/orderRoutes.js"

//App config
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:5173",   // user frontend (dev)
    "http://localhost:5174",   // admin panel (dev)
    "https://aurawear-frontend.vercel.app",  // user frontend (prod)
    "https://aura-wear-ecommerce-app.vercel.app"      // admin panel (prod) - if separate
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order', orderRouter)
// api endpoints
app.get("/",(req,res)=> {
    res.send("API sending")
})

app.listen(port,() => console.log("Server running at port : ",port))