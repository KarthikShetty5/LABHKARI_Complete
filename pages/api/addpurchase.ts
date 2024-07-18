import { NextApiRequest, NextApiResponse } from 'next';
import Purchase from '@/model/Purchase.model';
import connectDb from '@/middleware/mongoose';

const addPurchaseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {  batchId,purchaseDate,quantity,purchaseCost,gst,totalCost,gstIn,name } = req.body;
        
        const newPurchase = new Purchase({batchId,purchaseDate,quantity,purchaseCost,gst,totalCost,gstIn,name});

        const savedPurchase = await newPurchase.save();

        return res.status(200).json({
            success: true,
            message: "Purchase added successfully",
            data: savedPurchase
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Error adding Purchase to db",
            error: error.message
        });
    }
}

export default connectDb(addPurchaseHandler);

