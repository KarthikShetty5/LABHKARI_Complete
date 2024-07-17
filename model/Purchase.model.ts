import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface PurchaseDocument extends Document {
        batchId: string;
        purchaseDate: String;
        quantity: number;
        purchaseCost: number;
        gst: number;
        totalCost:number;
}

const PurchaseSchema = new Schema({
        batchId: { type: String, required: true },
        purchaseDate: { type: String, required: true },
        quantity: { type: Number, required: true },
        purchaseCost: { type: Number, required: true },
        gst: { type: Number, required: true },
        totalCost: { type: Number, required: true }
})

const Purchase = mongoose.models.Purchase || mongoose.model<PurchaseDocument>('Purchase', PurchaseSchema);

export default Purchase;
