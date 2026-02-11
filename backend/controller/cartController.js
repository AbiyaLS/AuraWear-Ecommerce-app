import userModel from "../models/userModel.js";

// add product to user cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
// update user cart
export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ message: "Updated Cart" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
// get user cart data
export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;  

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    res.status(200).json({ cartData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
