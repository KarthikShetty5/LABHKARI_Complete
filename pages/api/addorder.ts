import { NextApiRequest, NextApiResponse } from 'next';
import Order from '@/model/Order.model';
import connectDb from '@/middleware/mongoose';
import Cart from '@/model/Cart.model';

const addOrderHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const { orderId, email, name, phone, amount, amountPaid, userId, itemCount, shippingAddress, state, country, landmark, city, tag, pinCode, productId,quantity,productAmount } = req.body;

        const newOrder = new Order({
            orderId, email, name, phone, amount, amountPaid, userId, itemCount, shippingAddress, state, country, landmark, city, tag, pinCode, productId,quantity,productAmount
        });

        const savedOrder = await newOrder.save();

        await Cart.deleteMany({ userId: userId });

        return res.status(200).json({
            success: true,
            message: "Order added successfully",
            data: savedOrder
        });
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error adding Order to db",
            error: error.message
        });
    }
}

export default connectDb(addOrderHandler);

