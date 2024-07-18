import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface VariationDocument extends Document {
   variation:string;
   weight:number;
   length:number;
   breadth:number;
   height: number;
}

const VariationSchema = new Schema({
    variation: { type: String, required: true },
    weight: { type: Number, required: true },
    length: { type: Number, required: false },
    breadth: { type: Number, required: false },
    height: { type: Number, required: false },   
});

const Variation = mongoose.models.Variation || mongoose.model<VariationDocument>('Variation', VariationSchema);

export default Variation;
