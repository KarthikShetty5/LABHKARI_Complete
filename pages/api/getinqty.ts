import { NextApiRequest, NextApiResponse } from 'next';
import Inventory from '@/model/Inventory.model';
import connectDb from '@/middleware/mongoose';

const getInQty = async (req: NextApiRequest, res: NextApiResponse) => {
    const { productId,variation } = req.body;

    if (!productId || !variation) {
        return res.status(400).json({
            success: false,
            message: "product id and variation id is required"
        });
    }

    try {
        const inventory = await Inventory.findOne({ productId, variation });

        if (!inventory) {
            return res.status(200).json({
                success: false,
                message: "Inventory not found for the given product and variation"
            });
        }

        res.status(200).json({
            success: true,
            data: inventory
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default connectDb(getInQty);
