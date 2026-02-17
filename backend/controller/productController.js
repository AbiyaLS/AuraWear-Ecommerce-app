import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productsModel.js"

// create new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    if (!req.files) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    if (images.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Upload images to Cloudinary from buffer
    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { resource_type: "image" }
        );
        return result.secure_url;
      })
    );

    let parsedSizes = [];
    try {
      parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    } catch {
      parsedSizes = [];
    }

    const productData = {
      name,
      description,
      price: Number(price),
      image: imagesUrl,
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true" || bestseller === true,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

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