import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import User from '../../model/User.model'; // Adjust the path based on your actual structure
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const userRegister = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = ((length, chars) => Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join(''))(5, '0123456789');

    if (req.method !== 'POST') {
        return res.status(400).json({ error: "This method is not allowed" });
    }

    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields (username, email, phone, password) are required"
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    // Check if the email already exists in the database
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Encrypt password using AES
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret').toString();

        // Insert new user into the database
        const newUser = new User({
            userId: userId,
            name,
            email,
            phone,
            password: encryptedPassword
        });
        await newUser.save();

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: { userId: newUser.userId },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
};

export default connectDb(userRegister);
