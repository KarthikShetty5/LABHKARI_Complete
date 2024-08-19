import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface PromotionalDocument extends Document {
    applicableDate: Date;
    batchId: string;
    percentDiscount: number;
    cashAmount: number;
    points: number;
}

const PromotionalSchema = new Schema({
    
    applicableDate: { type: Date, required: true },
    batchId: { type: String, required: true },
    percentDiscount: { type: Number, required: true },
    cashAmount: { type: Number, required: true },
    points: { type: Number, required: true },
    gst: { type: Number },

});

const Promotional = mongoose.models.Promotional || mongoose.model<PromotionalDocument>('Promotional', PromotionalSchema);

export default Promotional;
