import { NextApiRequest, NextApiResponse } from 'next';
import Kyc from '@/model/Kyc.model';
import connectDb from '@/middleware/mongoose';

const updateKyc = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, PanCard, AccountNumber, IFSCCode } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "userId is required"
        });
    }

    try {
        const kyc = await Kyc.findOne({ userId });

        if (!kyc) {
            return res.status(404).json({
                success: false,
                message: "KYC not found for the given userId"
            });
        }

        kyc.PanCard = PanCard || kyc.PanCard;
        kyc.AccountNumber = AccountNumber || kyc.AccountNumber;
        kyc.IFSCCode = IFSCCode || kyc.IFSCCode;
        kyc.agreed = "true";

        await kyc.save();

        res.status(200).json({
            success: true,
            message: "KYC information updated successfully",
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

export default connectDb(updateKyc);
