import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend 
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"

    // Kiểm tra đầu vào
    if (!req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Kiểm tra cấu trúc items
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
        return res.status(400).json({ success: false, message: "Items must be a non-empty array" });
    }

    req.body.items.forEach(item => {
        if (!item.name || !item.price || !item.quantity) {
            return res.status(400).json({ success: false, message: "Each item must have a name, price, and quantity" });
        }
    });

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save().catch(err => {
            console.error("Error saving new order:", err);
            return res.status(500).json({ success: false, message: "Failed to save order" });
        });

        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "vnd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "vnd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2000
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}


const verifyOrder = async (req, res)=> {
    const {orderId, success} = req.body;
        try{
            if (success == "true") {
                await orderModel.findByIdAndUpdate(orderId, {payment:true});
                res.json({success:true, message:"Paid"})
            }
            else{
                await orderModel.findByIdAnDelete(orderId);
                res.json({success:false, message:"Not Paid"})
            }
        }
     catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

//user orders for frontend
const userOrders = async (req, res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

//listiing order for admin
const listOrders = async(req, res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

export { placeOrder, verifyOrder, userOrders, listOrders }