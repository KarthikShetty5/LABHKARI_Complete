import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface OrderDocument extends Document {
    orderId: string;
    email: string;
    name: string;
    phone: string;
    amount: number;
    amountPaid: boolean;
    state: string;
    country: string;
    landmark: string;
    city: string;
    userId: string;
    itemCount: number;
    tag: string;
    pinCode: number;
    shippingAddress: string;
    shipment_id: string;
}

const OrderSchema: Schema = new Schema({
    orderId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    amountPaid: { type: Boolean, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    userId: { type: String, required: true },
    itemCount: { type: Number, required: true },
    tag: { type: String, required: true },
    pinCode: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    shipment_id: { type: String, required: true }
});

const Order = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);
export default Order;
