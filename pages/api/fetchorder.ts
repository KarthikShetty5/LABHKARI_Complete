import { NextApiRequest, NextApiResponse } from 'next';
import Order from '@/model/Order.model';
import connectDb from '@/middleware/mongoose';

const fetchOrderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findOne({ orderId: orderId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Error fetching order",
            error: error.message
        });
    }
}

export default connectDb(fetchOrderHandler);
