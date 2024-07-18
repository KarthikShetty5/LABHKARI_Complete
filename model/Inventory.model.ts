import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface InventoryDocument extends Document {
    productId: string;
    variation: string;
    batchId: string;
    openingQty: number;
    inQty: number;
    outQty: number;
}

const InventorySchema = new Schema({
    productId: { type: Number, required: true },
    variation: { type: String, required: true },
    batchId: { type: Number, required: true },
    openingQty: { type: Number, required: true },
    inQty: { type: Number, required: true},
    outQty: { type: Number, required: true }
});

const Inventory = mongoose.models.Inventory || mongoose.model<InventoryDocument>('Inventory', InventorySchema);

export default Inventory;
