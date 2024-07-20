import { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/model/Product.model';
import Batch from '@/model/Batch.model';
import Variation from '@/model/Variation.model';
import Inventory from '@/model/Inventory.model';
import Purchase from '@/model/Purchase.model';
import connectDb from '@/middleware/mongoose';

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
}

interface InventoryType {
    _id: string;
    productId: string;
    inQty: number;
}

interface PurchaseType {
    _id: string;
    batchId: string;
    gst: number;
}

const getProductId = async (req: NextApiRequest, res: NextApiResponse) => {
    const { customId } = req.body;

    if (!customId) {
        return res.status(400).json({
            success: false,
            message: "Custom ID is required"
        });
    }

    try {
        const product = await Product.findOne({ customId }).lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const batches = await Batch.find({ productId: product.customId }).lean() as BatchType[];
        const variations = await Variation.find({ productId: product.customId }).lean() as VariationType[];
        const inventories = await Inventory.find({ productId: product.customId }).lean() as InventoryType[];
        const batchIds = batches.map(batch => batch.batchNo);
        const purchases = await Purchase.find({ batchId: { $in: batchIds } }).lean() as PurchaseType[];

        const prices: number[] = batches.map(batch => batch.MRP);
        const gsts: number[] = purchases.map(purchase => purchase.gst);
        const weights: number[] = variations.map(variation => variation.weight);
        const variationNames: string[] = variations.map(variation => variation.variation);
        const tags: string[] = inventories.map(inventory => inventory.inQty > 0 ? 'IN' : 'OUT');

        const combinedData = [{
            customId: product.customId,
            title: product.title,
            description: product.description,
            ratings: product.ratings,
            category: product.category,
            image: product.image,
            tags,
            prices,
            gsts,
            weights,
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

export default connectDb(getProductId);
