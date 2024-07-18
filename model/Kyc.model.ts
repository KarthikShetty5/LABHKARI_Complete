import mongoose, { Document, Model, Schema } from 'mongoose';

interface IKyc extends Document {
   userId: string;
   PanCard: string;
   AccountNumber: string;
   IFSCCode: string;
   agreed: string;
}

const KycSchema: Schema = new Schema({
    userId: { type: String, required: true },
    PanCard: { type: String, required: true },
    AccountNumber: { type: String, required: true },
    IFSCCode: { type: String, required: true },
    agreed: { type: String, required: true },
});

const Kyc: Model<IKyc> = mongoose.models.Kyc || mongoose.model<IKyc>("Kyc", KycSchema);

export default Kyc;
