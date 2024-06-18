import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface CartDocument extends Document {
    customId: number;
    userId: string;
    title: string;
    image: string;
    price: number;
    count: number;
    referralId?: string | null;
    gst: string;
    weight: string;
}

const cartSchema = new Schema({
    customId: { type: Number, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true },
    referralId: { type: String, default: null }, // Nullable field
    gst: { type: String, required: true },
    weight: { type: String, required: true }
});

const Cart = mongoose.models.Cart || mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;
