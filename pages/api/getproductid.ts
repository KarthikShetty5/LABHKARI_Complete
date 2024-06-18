import { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/model/Product.model';
import connectDb from '@/middleware/mongoose';

const getProductId = async (req: NextApiRequest, res: NextApiResponse) => {
    {
        const { customId } = req.body;
        try {
            // Fetch product by ID
            const product = await Product.find({ customId: customId });

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            // Respond with the product data
            return res.status(200).json({
                success: true,
                data: product,
            });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send("Internal server error");
        }
    }
}

export default connectDb(getProductId);