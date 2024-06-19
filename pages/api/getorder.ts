import { NextApiRequest, NextApiResponse } from 'next';
import Order from '@/model/Order.model';
import connectDb from '@/middleware/mongoose';

const getOrder = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const order = await Order.find();
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default connectDb(getOrder)