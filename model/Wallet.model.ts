import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface WalletDocument extends Document {
    WalletId: string;
    referralIncome: number;
    promos:string;
    performanceBonus:number;
    eShopEarning:number;
    leaderShipBonus:number;
    otherFund:number;
    points: number;
    userId: string;
}

const WalletSchema: Schema = new Schema({
    WalletId: { type: String, required: true },
    referralIncome: { type: Number, required: false },
    promos:{ type: String, required: false },
    performanceBonus:{ type: Number, required: false },
    eShopEarning:{ type: Number, required: false },
    leaderShipBonus:{ type: Number, required: false },
    otherFund:{ type: Number, required: false },
    points:{ type: Number, required: false},
    userId: { type: String, required: true }
});

const Wallet = mongoose.models.Wallet || mongoose.model<WalletDocument>('Wallet', WalletSchema);
export default Wallet;
