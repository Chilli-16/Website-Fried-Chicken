import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

import mongoose from 'mongoose';

// Hàm tạo token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Đăng nhập người dùng
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Thông tin đăng nhập không hợp lệ" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token, userId: user._id }); // Đảm bảo trả về userId
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi trong quá trình đăng nhập." });
    }
}

// Đăng ký người dùng
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "Người dùng đã tồn tại" });
        }

        // Kiểm tra định dạng email và mật khẩu mạnh
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập email hợp lệ" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập mật khẩu mạnh" });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({ success: true, token, userId: user._id }); // Đảm bảo trả về userId
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi trong quá trình đăng ký." });
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    console.log("Request userId:", userId);
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId");
      return res.status(400).json({ success: false, message: "ID người dùng không hợp lệ" });
    }
  
    try {
      const user = await userModel.findById(userId).select("-password");
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
      }
      console.log("User found:", user);
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  };
  


export { loginUser, registerUser , getUserById };
