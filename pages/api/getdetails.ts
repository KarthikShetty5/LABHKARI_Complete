import { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/model/Product.model';
import Batch from '@/model/Batch.model';
import Variation from '@/model/Variation.model';
import connectDb from '@/middleware/mongoose';
import Purchase from '@/model/Purchase.model';

interface BatchType {
    _id: string;
    productId: string;
    MRP: number;
    batchNo: string;
}

interface VariationType {
    _id: string;
    productId: string;
    weight: number;
    variation: string;
    height: number;
    length: number;
    breadth: number;
}

interface PurchaseType {
    _id: string;
    batchId: string;
    gst: number;
}


const getDetails = async (req: NextApiRequest, res: NextApiResponse) => {
    const { customId } = req.body;

    if (!customId) {
        return res.status(400).json({
            success: false,
            message: "Custom ID is required"
        });
    }

    try {
        console.log(customId)
        const product = await Product.findOne({ customId }).lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const batches = await Batch.find({ productId: product.customId }).lean() as BatchType[];
        const batchIds = batches.map(batch => batch.batchNo);
        const variations = await Variation.find({ productId: product.customId }).lean() as VariationType[];
        const purchases = await Purchase.find({ batchId: { $in: batchIds } }).lean() as PurchaseType[];
        const prices: number[] = batches.map(batch => batch.MRP);
        const gsts: number[] = purchases.map(purchase => purchase.gst);
        const weights: number[] = variations.map(variation => variation.weight);
        const heights: number[] = variations.map(variation => variation.height);
        const breadths: number[] = variations.map(variation => variation.breadth);
        const lengths: number[] = variations.map(variation => variation.length);
        const variationNames: string[] = variations.map(variation => variation.variation);

        const combinedData = [{
            customId: product.customId,
            title: product.title,
            image: product.image,
            prices,
            weights,
            heights,
            breadths,
            lengths,
            variations: variationNames
        }];

        res.status(200).json({
            success: true,
            data: combinedData
        });
    } catch (error: any) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default connectDb(getDetails);
