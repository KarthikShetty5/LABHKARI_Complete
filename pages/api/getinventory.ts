import { NextApiRequest, NextApiResponse } from 'next';
import Inventory from '@/model/Inventory.model';
import connectDb from '@/middleware/mongoose';

const getInventory = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const inventory = await Inventory.find();

        if (!inventory) {
            return res.status(200).json({
                success: false,
                message: "Inventory not found for the given userId"
            });
        }

        res.status(200).json({
            success: true,
            data:inventory
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default connectDb(getInventory);
