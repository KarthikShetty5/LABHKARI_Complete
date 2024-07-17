import { NextApiRequest, NextApiResponse } from 'next';
import  Batch from '@/model/Batch.model';
import connectDb from '@/middleware/mongoose';

const addBatchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { batchNo,productId,expiryDate,MRP,manufactureDate } = req.body;
        
        const newBatch = new Batch({batchNo,productId,expiryDate,MRP,manufactureDate});

        const savedBatch = await newBatch.save();

        return res.status(200).json({
            success: true,
            message: "Batch added successfully",
            data: savedBatch
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Error adding Batch to db",
            error: error.message
        });
    }
}

export default connectDb(addBatchHandler);

