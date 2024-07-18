import { NextApiRequest, NextApiResponse } from 'next';
import Batch from '@/model/Batch.model';
import connectDb from '@/middleware/mongoose';

const getBatch = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const batch = await Batch.find();
        res.status(200).json({
            success: true,
            data: batch
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default connectDb(getBatch)