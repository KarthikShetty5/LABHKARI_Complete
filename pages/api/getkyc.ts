import { NextApiRequest, NextApiResponse } from 'next';
import Kyc from '@/model/Kyc.model';
import connectDb from '@/middleware/mongoose';

const getKyc = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "userId is required"
        });
    }

    try {
        const kyc = await Kyc.findOne({ userId: userId });

        if (!kyc) {
            return res.status(200).json({
                success: false,
                message: "KYC not found for the given userId"
            });
        }

        res.status(200).json({
            success: true,
            data: kyc
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export default connectDb(getKyc);
