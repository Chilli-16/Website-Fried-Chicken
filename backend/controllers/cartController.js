import { response } from "express";
import userModel from "../models/userModel.js"


// add items to user cart

const addToCart = async (req, res) => {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!userId || !itemId) {
        return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    try {
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.json({ success: true, message: "Added to Cart", cartData });
    } catch (error) {
        console.log("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};



// remove items from user cart

const removeFromCart = async (req, res) => {
    const userId = req.userId; // Lấy `userId` từ `req.userId`
    const { itemId } = req.body; // Lấy `itemId` từ `req.body`

    // Kiểm tra nếu thiếu `userId` hoặc `itemId`
    if (!userId || !itemId) {
        return res.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    try {
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // Kiểm tra và tăng số lượng sản phẩm trong `cartData`
        let cartData = userData.cartData || {};
        if (cartData[itemId] >0 ) {
            cartData[itemId] -= 1; 
        }

        // Cập nhật `cartData` trong MongoDB
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.json({ success: true, message: "Removed to Cart" });
    } catch (error) {
        console.log("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};



// fetch user cart data
const getCart = async (req, res) => {
    try {
        // Giả sử middleware của bạn đã gán userId vào req.userId
        const userId = req.userId; 
        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing userId" });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}



export { addToCart, removeFromCart, getCart }