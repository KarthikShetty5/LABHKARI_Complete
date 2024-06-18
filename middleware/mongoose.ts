import mongoose from 'mongoose';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const connectDb = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connection.readyState >= 1) {
        return handler(req, res);
    }

    // Create new database connection
    const dbUri = process.env.MONGO_URI || '';

    try {
        await mongoose.connect('mongodb+srv://karhtikshetty1:karthiks563@cluster0.u72062k.mongodb.net/labhkari?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any); // Use type assertion to avoid TypeScript error
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return res.status(500).json({ error: 'Database connection error' });
    }

    return handler(req, res);
};

export default connectDb;
