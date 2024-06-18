import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import Cart from '../../model/Cart.model'; // Adjust the path based on your actual structure
import CryptoJS from 'crypto-js';

const fetchCart = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { uid } = req.body;
        if (!uid) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find cart items for the given user ID
        const cartItems = await Cart.find({ userId: uid });

        return res.status(200).json({
            success: true,
            data: cartItems
        });
    } catch (error) {
        console.error("Error fetching carts:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export default connectDb(fetchCart);

