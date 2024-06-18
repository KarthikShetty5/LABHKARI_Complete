import { NextApiRequest, NextApiResponse } from 'next';
import OrderModel, { OrderDocument } from '@/model/Order.model';
import connectDb from '@/middleware/mongoose';

const addOrderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { orderId, email, name, phone, amount, amountPaid, userId, itemCount, shippingAddress, state, country, landmark, city, tag, pinCode } = req.body;

        const newOrder = new OrderModel({
            orderId, email, name, phone, amount, amountPaid, userId, itemCount, shippingAddress, state, country, landmark, city, tag, pinCode
        });

        const savedOrder = await newOrder.save();

        return res.status(200).json({
            success: true,
            message: "Order added successfully",
            data: savedOrder
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Error adding Order to db",
            error: error.message
        });
    }
}

export default connectDb(addOrderHandler);

