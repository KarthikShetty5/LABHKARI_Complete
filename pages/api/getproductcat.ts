import { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/model/Product.model';
import connectDb from '@/middleware/mongoose';

const getProductCat = async (req: NextApiRequest, res: NextApiResponse) => {
    const { category } = req.body;
    try {
        // Fetch products by category
        const products = await Product.find({ category });

        if (!products.length) {
            return res.status(404).json({
                success: false,
                message: "No products found in this category"
            });
        }

        // Respond with the product data
        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal server error");
    }
}

export default connectDb(getProductCat);