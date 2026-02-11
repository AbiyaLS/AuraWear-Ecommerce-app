import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "../backend/routes/userRoutes.js"
import productRouter from "../backend/routes/productRoutes.js"
import cartRouter from "../backend/routes/cartRoutes.js"

//App config
const app = express()
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
// api endpoints
app.get("/",(req,res)=> {
    res.send("API sending")
})

app.listen(port,() => console.log("Server running at port : ",port))