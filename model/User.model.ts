import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    userId: string;
    name: string;
    email: string;
    phone: number;
    password: string;
    referralId: string;
}

const UserSchema: Schema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    referralId: { type: String, required: false },
});

const User = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;
