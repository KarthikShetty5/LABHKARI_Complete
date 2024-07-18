import mongoose, { Document, Schema, model, Model } from "mongoose";

export interface BatchDocument extends Document {
  batchNo: string;
  productId: string;
  expiryDate: string;
  MRP: string;
  manufactureDate: string;
  quantity: string;
  variation:string;
}

const batchSchema = new Schema({
  batchNo: { type: String, required: true },
  productId: { type: String, required: true },
  expiryDate: { type: String, required: true },
  MRP: { type: String, required: true },
  manufactureDate: { type: String, required: true },
  quantity: { type: String, required: true },
  variation: { type: String, required: true }
});

const Batch =
  mongoose.models.Batch || mongoose.model<BatchDocument>("Batch", batchSchema);

export default Batch;
