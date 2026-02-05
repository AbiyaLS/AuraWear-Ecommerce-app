import jwt from "jsonwebtoken"

const adminAuth = async (req,res,next) => {
    try {
        const { token } = req.headers
        if(!token){
            return res.status(400).json({ message: "Not Authorized Login Again!"})
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if( tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(400).json({ message: "Not Authorized Login Again!"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong ", error:error.message })
    }
}

export default adminAuth
    
