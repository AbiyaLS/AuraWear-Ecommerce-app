import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

// create token 
const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET
    )
  
}

// Login 
export const userLogin = async (req,res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if(!user){
            return res.status(400).json({ message: "User Not Found "})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.status(200).json({ token,message: "User Login Successfully" })
        }
        else{
            return res.status(400).json({ message: "Invalid Credential" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong ", error:error.message }) 
    }

}

// Register 
export const userRegister = async (req,res) => {
    try {
        const { name,email,password } = req.body

        // check user already exist or not
        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(400).json({ message: "User Already Exist" })
        }
        // validate email format and strong password
        if(!validator.isEmail(email)){
            return res.status(404).json({ message: "Please Enter valid email" })
        }
        if(password.length < 8){
            return res.status(404).json({ message: "Please Enter strong password" })
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.status(200).json({ token, message: "User Register Successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong ", error:error.message })
    }

}

// admin Login
export const adminLogin = async (req,res) => {
     try {
        const { email, password } = req.body
        if( email === process.env.ADMIN_EMAIL && password === process.env. ADMIN_PASSWORD ){
            const token = jwt.sign( email+password, process.env.JWT_SECRET )
            res.status(200).json({
            success: true,
            token: token,
            message: "Login successful"
            });
        }
        else{
            res.status(401).json({ message: "Invalid Credential"})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong ", error:error.message })
    }
   
} 