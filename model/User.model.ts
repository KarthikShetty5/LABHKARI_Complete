import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    userId: string;
    name: string;
    email: string;
    phone: number;
    password: string;
    joiningdate: string;
    referralId: string;
}

const UserSchema: Schema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    joiningdate: { type: String, required: true, unique: false },
    referralId: { type: String, required: false },
});

UserSchema.index({ email: 1 }, { unique: false });

const User = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;
