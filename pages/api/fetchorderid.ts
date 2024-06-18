import { NextApiRequest, NextApiResponse } from 'next';
import Order from '@/model/Order.model';
import connectDb from '@/middleware/mongoose';

const fetchOrdersByUserId = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.body;

        const orders = await Order.find({ userId });

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
}

export default connectDb(fetchOrdersByUserId);
