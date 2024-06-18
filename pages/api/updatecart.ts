import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import Cart from '../../model/Cart.model'; // Adjust the path based on your actual structure
import CryptoJS from 'crypto-js';


const updateCartUserId=async (req: NextApiRequest, res: NextApiResponse) =>  {
    try {
        const { oldUid, newUid } = req.body;
        if (!oldUid || !newUid) {
            return res.status(400).json({ success: false, message: "Old UID and New UID are required" });
        }

        // Check if the old UID exists in the cart collection
        const cartItems = await Cart.find({ userId: oldUid });

        // If no items found with old UID, return error
        if (cartItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Old UID not found in cart",
            });
        }

        // Update the userId from oldUid to newUid
        await Cart.updateMany({ userId: oldUid }, { userId: newUid });

        return res.status(200).json({
            success: true,
            message: "User ID updated successfully in cart",
        });
    } catch (error) {
        console.error("Error updating cart user ID:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export default connectDb(updateCartUserId);
