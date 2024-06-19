import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/model/User.model';
import connectDb from '@/middleware/mongoose';

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const user = await User.find();
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default connectDb(getUser)