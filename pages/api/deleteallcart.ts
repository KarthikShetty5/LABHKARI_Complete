import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import Cart from '../../model/Cart.model'; // Adjust the path based on your actual structure
import CryptoJS from 'crypto-js';

const deleteAllCartItem = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { uid } = req.body;
        
        if (!uid) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        // Delete the cart item
        await Cart.deleteMany({ userId: uid });

        // Fetch updated cart data after deletion
        const updatedCartItems = await Cart.find({ userId: uid });

        return res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
            cartItems: updatedCartItems,
        });
    } catch (error) {
        console.error("Error deleting carts:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export default connectDb(deleteAllCartItem);
