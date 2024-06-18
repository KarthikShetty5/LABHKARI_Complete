import { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/model/Product.model';
import connectDb from '@/middleware/mongoose';

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default connectDb(getProduct)