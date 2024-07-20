import { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/model/Product.model';
import Batch from '@/model/Batch.model';
import Variation from '@/model/Variation.model';
import Inventory from '@/model/Inventory.model';
import Purchase from '@/model/Purchase.model';
import connectDb from '@/middleware/mongoose';

interface ProductType {
    _id: string;
    customId: string;
    title: string;
    description: string;
    ratings: number;
    category: string;
    image: string;
}

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

const getProductCat = async (req: NextApiRequest, res: NextApiResponse) => {
    const { category } = req.body;

    if (!category) {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    try {
        const products = await Product.find({ category }).lean() as ProductType[];

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found in this category"
            });
        }

        const productIds = products.map(product => product.customId);

        const batches = await Batch.find({ productId: { $in: productIds } }).lean() as BatchType[];
        const variations = await Variation.find({ productId: { $in: productIds } }).lean() as VariationType[];
        const inventories = await Inventory.find({ productId: { $in: productIds } }).lean() as InventoryType[];
        const batchIds = batches.map(batch => batch._id);
        const purchases = await Purchase.find().lean() as PurchaseType[];

        const batchMap: { [key: string]: BatchType[] } = {};
        const variationMap: { [key: string]: VariationType[] } = {};
        const inventoryMap: { [key: string]: InventoryType[] } = {};
        const purchaseMap: { [key: string]: PurchaseType[] } = {};

        batches.forEach((batch: BatchType) => {
            if (!batchMap[batch.productId]) batchMap[batch.productId] = [];
            batchMap[batch.productId].push(batch);
        });

        variations.forEach((variation: VariationType) => {
            if (!variationMap[variation.productId]) variationMap[variation.productId] = [];
            variationMap[variation.productId].push(variation);
        });

        inventories.forEach((inventory: InventoryType) => {
            if (!inventoryMap[inventory.productId]) inventoryMap[inventory.productId] = [];
            inventoryMap[inventory.productId].push(inventory);
        });

        purchases.forEach((purchase: PurchaseType) => {
            if (!purchaseMap[purchase.batchId]) purchaseMap[purchase.batchId] = [];
            purchaseMap[purchase.batchId].push(purchase);
        });

        const combinedData = products.map(product => {
            const productId = product.customId;
            const batchDetails = batchMap[productId] || [];
            const variationDetails = variationMap[productId] || [];
            const inventoryDetails = inventoryMap[productId] || [];

            let price: number | null = null;
            let gst: number | null = null;
            let weights: number[] = [];
            let tags: string[] = [];
            let variations: string[] = [];

            if (batchDetails.length > 0) {
                price = batchDetails[0].MRP;
                if (purchaseMap[batchDetails[0].batchNo]) {
                    gst = purchaseMap[batchDetails[0].batchNo][0].gst;
                }
            }

            if (variationDetails.length > 0) {
                weights = variationDetails.map(variation => variation.weight);
                variations = variationDetails.map(variation => variation.variation);
            }

            if (inventoryDetails.length > 0) {
                tags = inventoryDetails.map(inventory => inventory.inQty > 0 ? 'IN' : 'OUT');
            }

            return {
                customId: product.customId,
                title: product.title,
                description: product.description,
                ratings: product.ratings,
                category: product.category,
                image: product.image,
                tags,
                price,
                gst,
                weights,
                variations
            };
        });

        res.status(200).json({
            success: true,
            data: combinedData
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export default connectDb(getProductCat);
