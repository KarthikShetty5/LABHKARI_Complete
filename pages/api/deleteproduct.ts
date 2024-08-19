import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import Product from '../../model/Product.model'; // Adjust the path based on your actual structure
import CryptoJS from 'crypto-js';

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }
        // Delete the cart item
        await Product.deleteOne({ customId:productId });

        // Fetch updated cart data after deletion
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting carts:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export default connectDb(deleteProduct);
