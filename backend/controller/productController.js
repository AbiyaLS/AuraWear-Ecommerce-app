import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productsModel.js"


// create new product
export const createProduct = async (req,res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

        // the other product can store in the database biut not the image file so 
        // we store the image in the cloudinary

        // filter image which show undefined
        const images = [ image1, image2, image3, image4 ].filter((item) => item !== undefined)

        // upload the image in cloudinary storage
        let imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image"})
                return result.secure_url
            })
        )
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now()
        }
        console.log(productData)
        const product = new productModel(productData)
        await product.save()
       
        res.status(200).json({ message: "Product Add Successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong ", error:error.message }) 
    }

}
// list  product 
export const listProducts = async (req,res) => {
    try {
        const products = await productModel.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong ", error:error.message }) 
    }
}
// remove product from list
export const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.status(200).json({ message: "Product Delete Successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong ", error:error.message }) 
    }
}

// get single product
export const getSingleProduct = async (req,res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong ", error:error.message }) 
    }
}