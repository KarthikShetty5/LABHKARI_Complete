import { NextApiRequest, NextApiResponse } from 'next';
import Wallet from '@/model/Wallet.model';
import connectDb from '@/middleware/mongoose';

const getWallet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.body;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'userId is required and should be a string',
        });
    }

    try {
        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({
                success: false,
                message: 'Wallet not found for the given userId',
            });
        }

        return res.status(200).json({
            success: true,
            data: wallet,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export default connectDb(getWallet);
