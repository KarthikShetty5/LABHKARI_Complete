import mongoose, { Schema, Document } from 'mongoose';

// Define a schema for the sequence collection
interface SequenceDocument extends Document {
    _id: string;
    sequence_value: number;
}

const SequenceSchema: Schema<SequenceDocument> = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
});

// Check if the model already exists in Mongoose's model registry
const modelName = 'Sequence';
const existingModel = mongoose.models[modelName] as mongoose.Model<SequenceDocument> | undefined;

// If the model exists, delete it before defining it again
if (existingModel) {
    delete mongoose.models[modelName];
}

// Create a model for the sequence collection
const SequenceModel = mongoose.model<SequenceDocument>(modelName, SequenceSchema);

export default SequenceModel;
