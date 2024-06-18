import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../middleware/mongoose'; // Adjust the path based on your actual structure
import Cart from '../../model/Cart.model'; // Adjust the path based on your actual structure

const addCartItem = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { customId, userId, count, title, image, price, ref, gst, weight } = req.body;

        // Check if the item already exists in the cart
        const existingCartItem = await Cart.findOne({ customId, userId });

        if (existingCartItem) {
            // If the item exists, update its count
            existingCartItem.count += count;
            await existingCartItem.save();
            return res.status(200).json({
                success: true,
                count: existingCartItem.count,
                message: "Cart item count updated successfully",
            });
        } else {
            // If the item does not exist, insert a new item into the cart
            const cartItem = new Cart({
                customId, userId, count, title, price, image, ref, gst, weight
            });
            await cartItem.save();
            return res.status(200).json({
                success: true,
                count,
                message: "Item added to cart successfully",
            });
        }
    } catch (error: any) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default connectDb(addCartItem);
