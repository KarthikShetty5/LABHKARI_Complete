import mongoose, { Document, Model, Schema } from 'mongoose';

interface IToken extends Document {
    tokenexpiry: string;
    email: string;
    token: string;
}

const TokenSchema: Schema = new Schema({
    tokenexpiry: { type: String, required: true },
    phone: { type: String, required: true },
    token: { type: String, required: true }
}, { timestamps: true });

const Token: Model<IToken> = mongoose.models.Token || mongoose.model<IToken>("Token", TokenSchema);

export default Token;
