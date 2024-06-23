import mongoose, { Document, Model, Schema } from 'mongoose';

interface IForgot extends Document {
    tokenexpiry: string;
    email: string;
    token: string;
}

const ForgotSchema: Schema = new Schema({
    tokenexpiry: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true }
}, { timestamps: true });

const Forgot: Model<IForgot> = mongoose.models.Forgot || mongoose.model<IForgot>("Forgot", ForgotSchema);

export default Forgot;
