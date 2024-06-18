import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import User from '../../model/User.model'; // Adjust the path based on your actual structure
import CryptoJS from 'crypto-js';

const userLogin = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(400).json({ error: "This method is not allowed" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // Decrypt stored password and compare
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret').toString(CryptoJS.enc.Utf8);
        if (decryptedPassword !== password) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: { userId: user.userId },
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
};

export default connectDb(userLogin);
