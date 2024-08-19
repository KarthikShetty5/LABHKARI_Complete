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

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const products = await Product.find().lean() as { _id: string; customId: string; title: string; description: string; ratings: number; category: string; image: string }[];

        const batches = await Batch.find().lean() as BatchType[];
        const variations = await Variation.find().lean() as VariationType[];
        const inventories = await Inventory.find().lean() as InventoryType[];
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

            let prices: number[] = [];
            let gsts: number[] = [];
            let weights: number[] = [];
            let variations: string[] = [];
            let tags: string[] = [];

            batchDetails.forEach(batch => {
                prices.push(batch.MRP);
                if (purchaseMap[batch.batchNo]) {
                    gsts.push(purchaseMap[batch.batchNo][0].gst);
                }
            });

            variationDetails.forEach(variation => {
                weights.push(variation.weight);
                variations.push(variation.variation);
            });

            inventoryDetails.forEach(inventory => {
                tags.push(inventory.inQty > 0 ? 'IN' : 'OUT');
            });

            return {
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

export default connectDb(getProduct);














// import { NextApiRequest, NextApiResponse } from 'next';
// import Product from '@/model/Product.model';
// import Batch from '@/model/Batch.model';
// import Variation from '@/model/Variation.model';
// import Inventory from '@/model/Inventory.model';
// import Purchase from '@/model/Purchase.model';
// import connectDb from '@/middleware/mongoose';
// import Promotional from '@/model/Promotional.model';

// interface BatchType {
//     _id: string;
//     productId: string;
//     MRP: number;
//     batchNo: string;
// }

// interface VariationType {
//     _id: string;
//     productId: string;
//     weight: number;
//     variation: string;
// }

// interface InventoryType {
//     _id: string;
//     productId: string;
//     inQty: number;
// }

// interface PurchaseType {
//     _id: string;
//     batchId: string;
//     gst: number;
// }

// interface PromotionType {
//     applicableDate:Date;
//     _id: string;
//     batchId: string;
//     gst: number;
//     percentDiscount:number;
//     cashAmount:number;
//     points:number
// }

// const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const products = await Product.find().lean() as { _id: string; customId: string; title: string; description: string; ratings: number; category: string; image: string }[];

//         const batches = await Batch.find().lean() as BatchType[];
//         const variations = await Variation.find().lean() as VariationType[];
//         const inventories = await Inventory.find().lean() as InventoryType[];
//         const purchases = await Purchase.find().lean() as PurchaseType[];
//         const promotions = await Promotional.find().lean() as PromotionType[];


//         const batchMap: { [key: string]: BatchType[] } = {};
//         const variationMap: { [key: string]: VariationType[] } = {};
//         const inventoryMap: { [key: string]: InventoryType[] } = {};
//         const purchaseMap: { [key: string]: PurchaseType[] } = {};
//         const promotionsMap: { [key: string]: PromotionType[] } = {};


//         batches.forEach((batch: BatchType) => {
//             if (!batchMap[batch.productId]) batchMap[batch.productId] = [];
//             batchMap[batch.productId].push(batch);
//         });

//         promotions.forEach((promotion: PromotionType) => {
//             if (!promotionsMap[promotion._id]) promotionsMap[promotion._id] = [];
//             promotionsMap[promotion._id].push(promotion);
//         });

//         variations.forEach((variation: VariationType) => {
//             if (!variationMap[variation.productId]) variationMap[variation.productId] = [];
//             variationMap[variation.productId].push(variation);
//         });

//         inventories.forEach((inventory: InventoryType) => {
//             if (!inventoryMap[inventory.productId]) inventoryMap[inventory.productId] = [];
//             inventoryMap[inventory.productId].push(inventory);
//         });

//         purchases.forEach((purchase: PurchaseType) => {
//             if (!purchaseMap[purchase.batchId]) purchaseMap[purchase.batchId] = [];
//             purchaseMap[purchase.batchId].push(purchase);
//         });

//         console.log('promos map',promotionsMap)

//         const combinedData = products.map(product => {
//             const productId = product.customId;
//             const batchDetails = batchMap[productId] || [];
//             const variationDetails = variationMap[productId] || [];
//             const inventoryDetails = inventoryMap[productId] || [];
//             const promotionsDetails = promotionsMap[productId] || [];


//             let prices: number[] = [];
//             let gsts: number[] = [];
//             let weights: number[] = [];
//             let variations: string[] = [];
//             let tags: string[] = [];

//             batchDetails.forEach(batch => {
//                 prices.push(batch.MRP);
//                 if (promotionsMap[batch.batchNo]) {
//                     gsts.push(promotionsMap[batch.batchNo][0].gst);
//                 }
//             });

//             variationDetails.forEach(variation => {
//                 weights.push(variation.weight);
//                 variations.push(variation.variation);
//             });

//             inventoryDetails.forEach(inventory => {
//                 tags.push(inventory.inQty > 0 ? 'IN' : 'OUT');
//             });

//             console.log('gsts',gsts)

//             return {
//                 customId: product.customId,
//                 title: product.title,
//                 description: product.description,
//                 ratings: product.ratings,
//                 category: product.category,
//                 image: product.image,
//                 tags,
//                 prices,
//                 gsts,
//                 weights,
//                 variations
//             };
//         });

//         res.status(200).json({
//             success: true,
//             data: combinedData
//         });
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };

// export default connectDb(getProduct);
