import { NextApiRequest, NextApiResponse } from 'next';
import Variation from '@/model/Variation.model';
import connectDb from '@/middleware/mongoose';

const getVariation = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const variation = await Variation.find();
        res.status(200).json({
            success: true,
            data: variation
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default connectDb(getVariation)