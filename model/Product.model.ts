import mongoose, { Schema, Document } from 'mongoose';
import SequenceModel from './SequencModel';

// Define your product schema
interface ProductDocument extends Document {
    customId: number;
    title: string;
    description: string;
    category: string;
    image: string;
    ratings: number;
}

const ProductSchema: Schema<ProductDocument> = new Schema({
    customId: { type: Number, unique: true }, // Ensure uniqueness of customId
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    ratings: { type: Number, required: true },
});

// Pre-save hook to generate auto-incrementing ID
ProductSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        const sequence = await SequenceModel.findByIdAndUpdate(
            { _id: 'productId' }, // Use a unique identifier for your sequence
            { $inc: { sequence_value: 1 } }, // Increment sequence value
            { new: true, upsert: true } // Create if not exists
        );

        (this as ProductDocument).customId = sequence.sequence_value;
        next();
    } catch (error: any) {
        next(error);
    }
});

// Check if the model already exists in Mongoose's model registry
const modelName = 'Product';
const existingModel = mongoose.models[modelName] as mongoose.Model<ProductDocument> | undefined;

// If the model exists, delete it before defining it again
if (existingModel) {
    delete mongoose.models[modelName];
}

// Create a model for the product schema
const ProductModel = mongoose.model<ProductDocument>(modelName, ProductSchema);

export default ProductModel;
