import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface PromotionalDocument extends Document {
    applicableDate: Date;
    batchId: string;
    percentDiscount: number;
    cashAmount: number;
}

const PromotionalSchema = new Schema({
    applicableDate: { type: Date, required: true },
    batchId: { type: String, required: true },
    percentDiscount: { type: Number, required: true },
    cashAmount: { type: Number, required: true },
});

const Promotional = mongoose.models.Promotional || mongoose.model<PromotionalDocument>('Promotional', PromotionalSchema);

export default Promotional;
