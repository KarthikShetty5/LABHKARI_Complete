import { NextApiRequest, NextApiResponse } from 'next';
import Order from '@/model/Order.model';
import connectDb from '@/middleware/mongoose';
import User from '@/model/User.model';

const getRecentOrders = async (req: NextApiRequest, res: NextApiResponse) => {
    const { num } = req.body;
    try {
        // Fetch the most recent two orders
        const recentOrders = await User.find({phone:num});

        res.status(200).json({
            success: true,
            data: recentOrders,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export default connectDb(getRecentOrders);
